import { fetchProducts } from "@/lib/woo";
import ProductGrid from "@/components/ProductGrid";

export const revalidate = 60; // Revalidate cache every 60 seconds

export default async function TiendaPage() {
    // Fetch products from WooCommerce REST API
    // We fetch up to 24 products for the initial grid
    let products: { id: number; name: string; price: string; images: { id: number; src: string; alt: string }[]; permalink: string; slug: string; }[] = [];
    try {
        const response = await fetchProducts();
        if (response) {
            products = response;
        }
    } catch (error) {
        console.error("Error fetching products:", error);
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

            {/* Filter / Sort Bar (Visual Placeholder for Zen Look) */}
            <section className="px-6 mb-12 max-w-7xl mx-auto">
                <div className="flex items-center justify-center border-b border-zen-sage/30 pb-4">
                    <div className="flex gap-8 overflow-x-auto">
                        <button className="text-xs uppercase tracking-widest font-semibold text-zen-dark border-b border-zen-dark pb-4 -mb-[17px]">Catálogo Completo</button>
                    </div>
                </div>
            </section>

            {/* Dynamic Product Grid */}
            <ProductGrid products={products} />

        </main>
    );
}
