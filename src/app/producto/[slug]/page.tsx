import { fetchProductBySlug } from "@/lib/woo";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export const revalidate = 60;

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    const products = await fetchProductBySlug(params.slug);

    if (!products || products.length === 0) {
        return notFound();
    }

    const product = products[0];
    const imageUrl = product.images.length > 0
        ? product.images[0].src
        : "https://images.unsplash.com/photo-1579761763131-dae193fb69ee?q=80&w=800&auto=format&fit=crop";

    // Strip WordPress HTML tags from the short description
    // In a real app we'd use 'html-react-parser' or similar
    const cleanDescription = product.short_description
        ? product.short_description.replace(/<[^>]*>?/gm, '')
        : "Una experiencia vibrante y premium para acompañar cada momento de tu día.";

    return (
        <main className="relative bg-zen-bone min-h-screen lg:flex lg:flex-row-reverse pb-16 lg:pb-0">

            {/* Right Side: Product Details */}
            <div className="relative lg:w-1/2 px-8 pt-32 lg:pt-40 lg:px-16 xl:px-24 flex flex-col min-h-[50vh] lg:min-h-screen">

                {/* Title & Price */}
                <div className="mb-10 text-left lg:mt-8">
                    <h1 className="font-serif text-4xl lg:text-5xl mb-4 leading-tight text-zen-dark">
                        {product.name}
                    </h1>
                    <div className="text-zen-sage font-sans font-medium text-xl tracking-wide">
                        €{product.price || '0.00'}
                    </div>
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

                {/* Accordions (Minimalist UX Concept) */}
                <div className="space-y-0 border-t border-zen-sage/20">
                    {/* Accordion Item 1 */}
                    <div className="border-b border-zen-sage/20 py-6">
                        <button className="flex w-full items-center justify-between group">
                            <span className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-zen-dark/80">Descripción Completa</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zen-sage group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                    {/* Accordion Item 2 */}
                    <div className="border-b border-zen-sage/20 py-6">
                        <button className="flex w-full items-center justify-between group">
                            <span className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-zen-dark/80">Envío y Devoluciones</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zen-sage group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>

            {/* Left Side: Hero Sticky Image */}
            <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen lg:sticky lg:top-0 -order-1 lg:order-none">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

        </main>
    );
}
