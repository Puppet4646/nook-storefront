"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface ImageProps {
    id: number;
    src: string;
    alt: string;
}

export default function ProductGallery({ images }: { images: ImageProps[] }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const handleSwipe = useCallback(() => {
        const diff = touchStartX.current - touchEndX.current;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && selectedImage < images.length - 1) {
                // Swipe left → next
                setSelectedImage(prev => prev + 1);
            } else if (diff < 0 && selectedImage > 0) {
                // Swipe right → prev
                setSelectedImage(prev => prev - 1);
            }
        }
    }, [selectedImage, images.length]);

    if (!images || images.length === 0) {
        return (
            <div className="w-full aspect-square lg:h-screen lg:sticky lg:top-0 bg-[#F9F9F7] flex flex-col items-center justify-center text-zen-sage/40">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Nook Specialty</span>
            </div>
        );
    }

    return (
        <div className="w-full lg:h-screen lg:sticky lg:top-0 bg-[#F9F9F7] flex flex-col lg:flex-row gap-4 p-0 lg:p-0">

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

            {/* Main Image Viewport — touch swipeable on mobile */}
            <div
                className="flex-1 relative h-[55vh] md:h-[65vh] lg:h-full overflow-hidden select-none"
                onTouchStart={(e) => { touchStartX.current = e.changedTouches[0].screenX; }}
                onTouchEnd={(e) => { touchEndX.current = e.changedTouches[0].screenX; handleSwipe(); }}
            >
                <div className="relative w-full h-full transition-transform duration-700 ease-in-out">
                    <Image
                        key={images[selectedImage].id}
                        src={images[selectedImage].src}
                        alt={images[selectedImage].alt || "Product Detail"}
                        fill
                        className="object-contain lg:object-cover p-2 md:p-4 lg:p-0 transition-opacity duration-500"
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>

                {/* Mobile Pagination Dots — clickable */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 lg:hidden">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(idx)}
                            aria-label={`Ver imagen ${idx + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${selectedImage === idx ? 'bg-zen-dark w-5' : 'bg-zen-dark/20 w-2'}`}
                        />
                    ))}
                </div>

                {/* Mobile Arrow Indicators */}
                {selectedImage > 0 && (
                    <button
                        onClick={() => setSelectedImage(prev => prev - 1)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-zen-dark shadow-sm lg:hidden"
                        aria-label="Imagen anterior"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                )}
                {selectedImage < images.length - 1 && (
                    <button
                        onClick={() => setSelectedImage(prev => prev + 1)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-zen-dark shadow-sm lg:hidden"
                        aria-label="Siguiente imagen"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                )}
            </div>

            {/* Floating Info Overlay (Optional premium touch) */}
            <div className="absolute top-6 left-6 lg:left-24 font-sans text-[10px] uppercase tracking-[0.4em] text-zen-dark/30 hidden lg:block">
                Curated Selection
            </div>

            {/* Mobile Thumbnail Strip */}
            <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar lg:hidden">
                {images.map((img, idx) => (
                    <button
                        key={img.id}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative flex-shrink-0 w-14 h-14 border transition-all duration-200 ${selectedImage === idx ? 'border-zen-dark opacity-100' : 'border-zen-sage/20 opacity-50'
                            }`}
                    >
                        <Image
                            src={img.src}
                            alt={`Miniatura ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="56px"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
