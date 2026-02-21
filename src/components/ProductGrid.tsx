import Image from 'next/image';
import Link from 'next/link';

// Using a simplified interface for the component props
interface WooCommerceProduct {
    id: number;
    name: string;
    price: string;
    images: { id: number; src: string; alt: string }[];
    permalink: string;
    slug: string;
}

export default function ProductGrid({ products }: { products: WooCommerceProduct[] }) {
    if (!products || products.length === 0) {
        return <div className="text-center py-24 text-zen-sage font-sans text-sm tracking-widest uppercase">No hay productos disponibles.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 px-6 max-w-7xl mx-auto mb-24">
            {products.map((product) => {
                // Fallback image if product has no image
                const imageUrl = product.images.length > 0
                    ? product.images[0].src
                    : "https://images.unsplash.com/photo-1579761763131-dae193fb69ee?q=80&w=800&auto=format&fit=crop";

                return (
                    <div key={product.id} className="group flex flex-col gap-4">
                        <Link href={`/producto/${product.slug}`} className="relative aspect-[3/4] overflow-hidden bg-white/50 block">
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />
                            <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center border border-zen-sage/20 text-zen-dark hover:bg-zen-sage hover:text-white">
                                <span className="font-sans text-xs tracking-widest uppercase px-2 py-1">Añadir</span>
                            </button>
                        </Link>

                        <div className="flex flex-col gap-1 items-center text-center mt-2">
                            <Link href={`/producto/${product.slug}`}>
                                <h3 className="font-serif text-lg text-zen-dark group-hover:underline underline-offset-4 decoration-1 decoration-zen-sage/60 transition-all">
                                    {product.name}
                                </h3>
                            </Link>
                            <p className="text-[#8C9A7B] text-sm font-sans font-medium mt-1">
                                €{product.price || '0.00'}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
