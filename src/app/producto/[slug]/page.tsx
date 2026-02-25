import { fetchProductBySlug, fetchProducts } from "@/lib/woo";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";

export const revalidate = 60;

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const products = await fetchProductBySlug(slug);

    if (!products || products.length === 0) {
        return notFound();
    }

    const product = products[0];

    // Helper to get attribute values safely
    const getAttr = (name: string) => product.attributes?.find((a: { name: string; options?: string[] }) => a.name === name)?.options?.[0] || "";

    const tastingNotes = getAttr("Notas de Cata");
    const prepTemp = getAttr("Temperatura");
    const prepTime = getAttr("Tiempo");
    const prepIntensity = getAttr("Intensidad");

    // Related products (same category)
    let relatedProducts: { id: number; slug: string; name: string; price: string; permalink: string; images: { id: number; src: string; alt: string }[] }[] = [];
    if (product.categories && product.categories.length > 0) {
        const categoryId = product.categories[0].id;
        const allCategoryProducts = await fetchProducts(categoryId);
        relatedProducts = allCategoryProducts
            .filter((p: { id: number }) => p.id !== product.id)
            .slice(0, 4);
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Header Section: Gallery + Basic Info */}
            <main className="relative lg:flex lg:flex-row-reverse">

                {/* Product Info Panel */}
                <div className="lg:w-1/2 px-5 pt-6 pb-12 lg:pt-48 lg:px-20 flex flex-col justify-center">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-zen-sage">Origin: Yunnan</span>
                            <div className="h-px flex-1 bg-zen-sage/20" />
                            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-zen-sage">No. {product.id.toString().slice(-3)}</span>
                        </div>

                        <h1 className="font-serif text-3xl md:text-5xl lg:text-7xl mb-4 md:mb-6 leading-[1.1] text-zen-dark">
                            {product.name}
                        </h1>

                        <div className="mb-8 flex items-baseline gap-4">
                            <span className="text-2xl font-sans font-light text-zen-dark" dangerouslySetInnerHTML={{ __html: product.price_html || `€${product.price}` }} />
                            <span className="text-xs uppercase tracking-widest text-zen-sage/60">(Incl. IVA)</span>
                        </div>

                        <div className="prose prose-sm prose-zen mb-12" dangerouslySetInnerHTML={{ __html: product.short_description }} />

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-12 md:mb-20">
                            <AddToCartButton product={product} />
                        </div>

                        {/* Quick Prep Icons */}
                        <div className="grid grid-cols-3 gap-4 md:gap-8 py-6 md:py-8 border-y border-zen-sage/10">
                            <div className="text-center">
                                <span className="block text-[10px] uppercase tracking-widest text-zen-sage mb-2">Temp</span>
                                <span className="text-xl font-serif text-zen-dark">{prepTemp || "95ºC"}</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-[10px] uppercase tracking-widest text-zen-sage mb-2">Time</span>
                                <span className="text-xl font-serif text-zen-dark">{prepTime || "3 min"}</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-[10px] uppercase tracking-widest text-zen-sage mb-2">Intensity</span>
                                <span className="text-xl font-serif text-zen-dark">{prepIntensity || "8/10"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical Gallery */}
                <div className="lg:w-1/2">
                    <ProductGallery images={product.images} />
                </div>
            </main>

            {/* Sensory Experience (Full Width Section) */}
            <section className="bg-zen-dark text-zen-bone py-16 md:py-32 lg:py-48 px-5 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="font-sans text-[10px] uppercase tracking-[0.5em] mb-12 block opacity-40">Sensory Experience</span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-6xl mb-8 md:mb-12 italic leading-tight">
                        &quot;{tastingNotes || "Una sinfonía de matices que despiertan el espíritu con cada sorbo."}&quot;
                    </h2>
                    <div className="w-24 h-px bg-zen-bone/20 mx-auto mb-12" />
                    <p className="font-sans font-light text-lg lg:text-xl tracking-wide max-w-2xl mx-auto opacity-80 leading-relaxed">
                        Perfiles sensoriales: {tastingNotes || "Cuerpo equilibrado con un final persistente y aromático."}
                    </p>
                </div>
            </section>

            {/* Narrative / Context Section */}
            <section className="py-16 md:py-32 lg:py-48 px-5 md:px-6 bg-[#F9F9F7]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                    <div className="order-2 lg:order-1">
                        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-zen-sage mb-8 block">The Narrative</span>
                        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-8 text-zen-dark leading-snug">
                            Historias guardadas en cada hebra
                        </h3>
                        <div className="prose prose-lg prose-zen" dangerouslySetInnerHTML={{ __html: product.description }} />
                        <Link href="/tienda" className="inline-block mt-12 font-sans text-xs uppercase tracking-[0.3em] border-b border-zen-dark pb-1 text-zen-dark hover:text-zen-sage hover:border-zen-sage transition-colors">
                            Descubre la colección completa
                        </Link>
                    </div>
                    <div className="order-1 lg:order-2 aspect-4/5 relative bg-zen-bone">
                        {product.images?.[1] && (
                            <img
                                src={product.images[1].src}
                                alt="Ambiental detail"
                                className="w-full h-full object-cover grayscale-20 sepia-10 hover:grayscale-0 transition-all duration-1000"
                            />
                        )}
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-16 md:py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 md:mb-16 gap-4">
                            <h2 className="font-serif text-2xl md:text-4xl text-zen-dark italic">Quizás desees probar...</h2>
                            <Link href="/tienda" className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity">Ver todo</Link>
                        </div>
                        <ProductGrid products={relatedProducts} />
                    </div>
                </section>
            )}

            {/* Sticky Floating Add to Cart (Mobile) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-zen-sage/10 z-50 flex items-center justify-between gap-4">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-zen-sage">{product.name}</span>
                    <span className="font-sans text-sm font-medium" dangerouslySetInnerHTML={{ __html: product.price_html }} />
                </div>
                <AddToCartButton product={product} />
            </div>
        </div>
    );
}
