"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageProps {
    id: number;
    src: string;
    alt: string;
}

export default function ProductGallery({ images }: { images: ImageProps[] }) {
    const [selectedImage, setSelectedImage] = useState(0);

    // Fallback if no images
    if (!images || images.length === 0) {
        return (
            <div className="w-full h-[50vh] lg:h-screen lg:sticky lg:top-0 bg-zen-bone/50 flex flex-col items-center justify-center text-[#8C9A7B] border border-zen-sage/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-2 opacity-50"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path><path d="M12 12c-3.3 0-6-2.7-6-6V2h12v4c0 3.3-2.7 6-6 6Z"></path></svg>
                <span className="font-sans text-xs uppercase tracking-widest opacity-60">Nook</span>
            </div>
        );
    }

    return (
        <div className="w-full h-auto lg:h-screen lg:sticky lg:top-0 flex flex-col relative group">

            {/* Main Image */}
            <div className="relative w-full h-[60vh] lg:h-full transition-opacity duration-300">
                <Image
                    src={images[selectedImage].src}
                    alt={images[selectedImage].alt || "Product image"}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />
            </div>

            {/* Thumbnail Navigator (only if multiple images) */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 p-3 bg-white/40 backdrop-blur-md rounded-none border border-zen-sage/30 shadow-sm opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                    {images.map((img, idx) => (
                        <button
                            key={img.id}
                            onClick={() => setSelectedImage(idx)}
                            className={`relative w-12 h-16 overflow-hidden transition-all ${selectedImage === idx ? 'ring-2 ring-zen-dark scale-105' : 'opacity-60 hover:opacity-100'}`}
                        >
                            <Image
                                src={img.src}
                                alt={`Thumbnail ${idx}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
