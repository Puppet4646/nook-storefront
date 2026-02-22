'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Using a simplified interface for the component props
interface WooCommerceProduct {
    id: number;
    name: string;
    price: string;
    images: { id: number; src: string; alt: string }[];
    permalink: string;
    slug: string;
}

// Internal component to handle individual product images with fallback
function ProductImage({ src, alt }: { src: string; alt: string }) {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    // Reliable fallback: A nice nature/tea related image from Picsum
    // Using a specific ID to ensure it's not blocked and looks professional
    const fallbackUrl = "https://picsum.photos/seed/nook-tea/800/1067";

    return (
        <img
            src={hasError ? fallbackUrl : imgSrc}
            alt={alt}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${hasError ? 'opacity-90 contrast-90' : ''}`}
            loading="lazy"
            onError={() => {
                if (!hasError) {
                    setHasError(true);
                }
            }}
        />
    );
}

export default function ProductGrid({ products }: { products: WooCommerceProduct[] }) {
    if (!products || products.length === 0) {
        return <div className="text-center py-24 text-zen-sage font-sans text-sm tracking-widest uppercase">No hay productos disponibles.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 px-6 max-w-7xl mx-auto mb-24">
            {products.map((product) => {
                const initialImageUrl = product.images && product.images.length > 0
                    ? product.images[0].src
                    : "https://picsum.photos/seed/placeholder/800/1067"; // Initial fallback if no image at all

                return (
                    <div key={product.id} className="group flex flex-col gap-4">
                        <Link href={`/producto/${product.slug}`} className="relative aspect-[3/4] overflow-hidden bg-zen-bone/40 block border border-zen-sage/5">
                            <ProductImage src={initialImageUrl} alt={product.name} />

                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

                            <button className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center border border-zen-sage/20 text-zen-dark hover:bg-zen-sage hover:text-white shadow-sm">
                                <span className="font-sans text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-medium">Ver Detalle</span>
                            </button>
                        </Link>

                        <div className="flex flex-col gap-1 items-center text-center mt-2 px-1">
                            <Link href={`/producto/${product.slug}`}>
                                <h3 className="font-serif text-base text-zen-dark group-hover:text-zen-sage transition-colors line-clamp-2">
                                    {product.name}
                                </h3>
                            </Link>
                            <p className="text-zen-sage text-sm font-sans font-medium tracking-wide">
                                {product.price ? `${parseFloat(product.price).toFixed(2)}€` : 'Consultar'}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
