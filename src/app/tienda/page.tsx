import { fetchProducts, fetchCategories } from "@/lib/woo";
import ProductGrid from "@/components/ProductGrid";
import CategoryFilter from "@/components/CategoryFilter";

export const revalidate = 60; // Revalidate cache every 60 seconds

export default async function TiendaPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // 1. Extraer los parámetros de la URL
    const categorySlug = typeof searchParams.categoria === 'string' && searchParams.categoria !== 'todas'
        ? searchParams.categoria
        : null;

    // El orden es manejado visualmente a través del componente cliente 
    // y aplicaremos la ordenación JS básica antes de pasar al renderizado.
    const sortParam = typeof searchParams.orden === 'string' ? searchParams.orden : 'default';

    let products: { id: number; name: string; price: string; date_created?: string; images: { id: number; src: string; alt: string }[]; permalink: string; slug: string; }[] = [];
    let categories: any[] = [];

    // 2. Fetch de datos en paralelo (Categorías y Listado Global)
    try {
        const [productsRes, categoriesRes] = await Promise.all([
            fetchProducts(),
            fetchCategories()
        ]);

        // Filtramos categorías vacías y la 'uncategorized'
        categories = categoriesRes.filter((c: any) => c.slug !== 'uncategorized' && c.count > 0);
        let baseProducts = productsRes || [];

        // 3. Filtrar por Categoría manualmente (ya que la API a veces es lenta)
        if (categorySlug) {
            // Buscamos el ID de la categoría pedida en la URL
            const requestedCat = categories.find((c: any) => c.slug === categorySlug);
            if (requestedCat) {
                // Filtramos el array base buscando si el producto tiene esa categoría
                baseProducts = baseProducts.filter((p: any) =>
                    p.categories && p.categories.some((cat: any) => cat.id === requestedCat.id)
                );
            }
        }

        // 4. Ordenación basada en el sort param
        if (sortParam === 'price_asc') {
            baseProducts.sort((a: any, b: any) => parseFloat(a.price || '0') - parseFloat(b.price || '0'));
        } else if (sortParam === 'price_desc') {
            baseProducts.sort((a: any, b: any) => parseFloat(b.price || '0') - parseFloat(a.price || '0'));
        } else if (sortParam === 'newest') {
            baseProducts.sort((a: any, b: any) => {
                const dateA = a.date_created ? new Date(a.date_created).getTime() : 0;
                const dateB = b.date_created ? new Date(b.date_created).getTime() : 0;
                return dateB - dateA;
            });
        }

        products = baseProducts;

    } catch (error) {
        console.error("Error fetching data for Tienda:", error);
    }

    return (
        <main className="min-h-screen bg-zen-bone pt-32 pb-16">

            {/* Editorial Header */}
            <section className="px-6 pb-20 text-center max-w-4xl mx-auto">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-zen-dark mb-6">Nuestra Colección</h1>
                <p className="text-zen-sage text-sm uppercase tracking-[0.2em] font-medium font-sans max-w-lg mx-auto leading-relaxed">
                    Calidad Premium Artesanal para elevar cada uno de tus rituales diarios.
                </p>
            </section>

            {/* Layout Principal: Sidebar Izquierdo + Grilla de Productos Derecha */}
            <section className="px-6 mb-12 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Sidebar Categorías (25% ancho en Desktop) */}
                    <aside className="w-full md:w-1/4 flex-shrink-0 sticky top-24">
                        <CategoryFilter categories={categories} />
                    </aside>

                    {/* Grilla de Resultados (75% ancho en Desktop) */}
                    <div className="w-full md:w-3/4">
                        {products.length > 0 ? (
                            <ProductGrid products={products} />
                        ) : (
                            <div className="w-full h-64 flex flex-col items-center justify-center bg-zen-light/30 border border-zen-sage/20 rounded-md">
                                <p className="text-zen-sage font-serif text-xl">No hay productos en esta categoría aún.</p>
                                <p className="text-sm font-sans text-zen-dark/60 mt-2">Prueba seleccionando otra familia de productos.</p>
                            </div>
                        )}
                    </div>

                </div>
            </section>

        </main>
    );
}
