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

    if (!images || images.length === 0) {
        return (
            <div className="w-full aspect-square lg:h-screen lg:sticky lg:top-0 bg-[#F9F9F7] flex flex-col items-center justify-center text-zen-sage/40">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Nook Specialty</span>
            </div>
        );
    }

    return (
        <div className="w-full lg:h-screen lg:sticky lg:top-0 bg-[#F9F9F7] flex flex-col lg:flex-row gap-4 px-4 py-8 lg:p-0">

            {/* Desktop Thumbnails (Vertical Sidebar) */}
            <div className="hidden lg:flex flex-col gap-4 w-20 px-4 py-10 z-20 overflow-y-auto no-scrollbar">
                {images.map((img, idx) => (
                    <button
                        key={img.id}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative aspect-[3/4] w-full border transition-all duration-300 ${selectedImage === idx ? 'border-zen-dark opacity-100' : 'border-transparent opacity-40 hover:opacity-100'
                            }`}
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

            {/* Main Image Viewport */}
            <div className="flex-1 relative h-[70vh] lg:h-full overflow-hidden">
                <div
                    className="relative w-full h-full transition-transform duration-700 ease-in-out"
                >
                    <Image
                        key={images[selectedImage].id}
                        src={images[selectedImage].src}
                        alt={images[selectedImage].alt || "Product Detail"}
                        fill
                        className="object-contain lg:object-cover p-4 lg:p-0 transition-opacity duration-500"
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>

                {/* Mobile Pagination Dots */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 lg:hidden">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${selectedImage === idx ? 'bg-zen-dark w-4' : 'bg-zen-dark/20'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Floating Info Overlay (Optional premium touch) */}
            <div className="absolute top-6 left-6 lg:left-24 font-sans text-[10px] uppercase tracking-[0.4em] text-zen-dark/30 hidden lg:block">
                Curated Selection
            </div>
        </div>
    );
}
