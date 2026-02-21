import { fetchProductBySlug, fetchProducts } from "@/lib/woo";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import ProductAccordion from "@/components/ProductAccordion";
import ProductGrid from "@/components/ProductGrid";

export const revalidate = 60;

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    const products = await fetchProductBySlug(params.slug);

    if (!products || products.length === 0) {
        return notFound();
    }

    const product = products[0];

    // Fetch related products (same category)
    let relatedProducts: any[] = [];
    if (product.categories && product.categories.length > 0) {
        const categoryId = product.categories[0].id;
        const allCategoryProducts = await fetchProducts(categoryId);
        // Exclude the current product and limit to 4
        relatedProducts = allCategoryProducts
            .filter((p: any) => p.id !== product.id)
            .slice(0, 4);
    }

    const imageUrl = product.images.length > 0
        ? product.images[0].src
        : "https://images.unsplash.com/photo-1579761763131-dae193fb69ee?q=80&w=800&auto=format&fit=crop";

    // Strip WordPress HTML tags from the short description
    // In a real app we'd use 'html-react-parser' or similar
    const cleanDescription = product.short_description
        ? product.short_description.replace(/<[^>]*>?/gm, '')
        : "Una experiencia vibrante y premium para acompañar cada momento de tu día.";

    return (
        <>
            <main className="relative bg-zen-bone min-h-screen lg:flex lg:flex-row-reverse pb-16 lg:pb-0">

                {/* Right Side: Product Details */}
                <div className="relative lg:w-1/2 px-8 pt-32 lg:pt-40 lg:px-16 xl:px-24 flex flex-col min-h-[50vh] lg:min-h-screen">

                    {/* Title & Price */}
                    <div className="mb-10 text-left lg:mt-8">
                        <h1 className="font-serif text-4xl lg:text-5xl mb-4 leading-tight text-zen-dark">
                            {product.name}
                        </h1>
                        <div className="text-zen-sage font-sans font-medium text-xl tracking-wide" dangerouslySetInnerHTML={{ __html: product.price_html || `€${product.price}` }} />
                    </div>

                    {/* Poetic Description */}
                    <div className="mb-12 max-w-lg">
                        <p className="font-sans font-light leading-relaxed text-zen-dark/80 text-sm italic">
                            {cleanDescription}
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="mb-16">
                        <AddToCartButton product={product} />
                    </div>

                    {/* Dynamic Accordions */}
                    <div className="space-y-0 border-t border-zen-sage/20 mb-12">
                        <ProductAccordion
                            title="Descripción Completa"
                            content={product.description
                                ? <div dangerouslySetInnerHTML={{ __html: product.description.replace(/style="[^"]*"/g, "") }} className="prose prose-sm prose-zen" />
                                : "Este producto de especialidad ha sido cuidadosamente seleccionado basándonos en sus perfiles de taza excepcionales y prácticas de cultivo éticas."}
                        />
                        <ProductAccordion
                            title="Elaboración y Cuidado"
                            content="Para preservar la delicadeza de nuestras hojas y granos, almacénalos en un lugar fresco y alejado de la luz solar directa. Consulta nuestra guía de infusión en la tarjeta adjunta a tu pedido."
                        />
                        <ProductAccordion
                            title="Envío y Devoluciones"
                            content="Procesamos pedidos en 24-48 horas. Envío estándar en península (2-3 días). Aceptamos devoluciones de productos sin abrir hasta 14 días después de la entrega."
                        />
                    </div>

                </div>

                {/* Left Side: Dynamic Gallery */}
                <div className="w-full lg:w-1/2 -order-1 lg:order-none z-10">
                    <ProductGallery images={product.images} />
                </div>

            </main>

            {/* Productos Relacionados */}
            {
                relatedProducts.length > 0 && (
                    <section className="bg-white py-24 border-t border-zen-sage/10">
                        <div className="max-w-7xl mx-auto px-6">
                            <h2 className="font-serif text-3xl text-zen-dark mb-12 text-center">También podría interesarte</h2>
                            <ProductGrid products={relatedProducts} />
                        </div>
                    </section>
                )
            }
        </>
    );
}
