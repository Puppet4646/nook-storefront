import Image from "next/image";

interface ProductImageProps {
    src?: string | null;
    alt: string;
    className?: string;
    fill?: boolean;
    width?: number;
    height?: number;
}

export default function ProductImage({
    src,
    alt,
    className = "",
    fill = false,
    width,
    height,
}: ProductImageProps) {
    // If there's a valid remote image source
    if (src && src.trim() !== "") {
        // If fill is true, we don't pass width/height
        if (fill) {
            return (
                <Image
                    src={src}
                    alt={alt}
                    className={className}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            );
        }

        // Fallback block if width/height are preferred
        return (
            <Image
                src={src}
                alt={alt}
                className={className}
                width={width || 500}
                height={height || 500}
                style={{ objectFit: "cover" }}
            />
        );
    }

    // Fallback / Placeholder when no image exists
    return (
        <div
            className={`bg-zen-bone/50 flex flex-col items-center justify-center text-[#8C9A7B] border border-zen-sage/20 ${className}`}
            {...(fill ? { style: { position: "absolute", inset: 0 } } : {})}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-12 h-12 mb-2 opacity-50"
            >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 3.5 0 0 0 0 7h5a3.5 3.5 3.5 0 0 1 0 7H6" />
                <path d="M12 12c-3.3 0-6-2.7-6-6V2h12v4c0 3.3-2.7 6-6 6Z" />
            </svg>
            <span className="font-sans text-xs uppercase tracking-widest opacity-60">Nook Specialty</span>
        </div>
    );
}
