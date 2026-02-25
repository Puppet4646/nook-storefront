import { fetchProducts, fetchCategories, type WooCategory, type WooProduct } from "@/lib/woo";
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

    let products: WooProduct[] = [];
    let categories: WooCategory[] = [];

    // 2. Fetch de datos en paralelo (Categorías y Listado Global)
    try {
        const [productsRes, categoriesRes] = await Promise.all([
            fetchProducts(null),
            fetchCategories()
        ]);

        console.log("TIENDA DEBUG: Products fetched count:", productsRes?.length || 0);
        console.log("TIENDA DEBUG: Categories fetched count:", categoriesRes?.length || 0);

        // Filtramos categorías vacías solo si no estamos en modo desarrollo/inicial
        categories = categoriesRes.filter((c) => c.slug !== 'uncategorized');
        
        let baseProducts = (productsRes || []).map(p => {
            if (p.slug === 'filtro-de-tela-tradicional') {
                return { ...p, images: [{ id: 99999, src: '/images/filtro-tela.jpg', alt: 'Filtro de Tela Tradicional' }] };
            }
            return p;
        });

        // 3. Filtrar por Categoría manualmente (ya que la API a veces es lenta)
        if (categorySlug) {
            // Buscamos el ID de la categoría pedida en la URL
            const requestedCat = categories.find((c) => c.slug === categorySlug);
            if (requestedCat) {
                // Filtramos el array base buscando si el producto tiene esa categoría
                baseProducts = baseProducts.filter((p) =>
                    p.categories && p.categories.some((cat) => cat.id === requestedCat.id)
                );
            }
        }

        // 4. Ordenación basada en el sort param
        if (sortParam === 'price_asc') {
            baseProducts.sort((a, b) => parseFloat(a.price || '0') - parseFloat(b.price || '0'));
        } else if (sortParam === 'price_desc') {
            baseProducts.sort((a, b) => parseFloat(b.price || '0') - parseFloat(a.price || '0'));
        } else if (sortParam === 'newest') {
            baseProducts.sort((a, b) => {
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
        <main className="min-h-screen bg-zen-bone pt-24 md:pt-32 pb-16">

            {/* Editorial Header */}
            <section className="px-4 md:px-6 pb-12 md:pb-20 text-center max-w-4xl mx-auto">
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-zen-dark mb-4 md:mb-6">Nuestra Colección</h1>
                <p className="text-zen-sage text-sm uppercase tracking-[0.2em] font-medium font-sans max-w-lg mx-auto leading-relaxed">
                    Calidad Premium Artesanal para elevar cada uno de tus rituales diarios.
                </p>
            </section>

            {/* Layout Principal: Sidebar Izquierdo + Grilla de Productos Derecha */}
            <section className="px-4 md:px-6 mb-12 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Sidebar Categorías (25% ancho en Desktop) */}
                    <aside className="w-full md:w-1/4 shrink-0 sticky top-24">
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
