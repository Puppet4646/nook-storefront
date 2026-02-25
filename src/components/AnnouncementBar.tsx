"use client";

import { useState } from "react";

function getInitialVisibility() {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem("announcement-dismissed");
}

export default function AnnouncementBar() {
    const [visible, setVisible] = useState(getInitialVisibility);

    const dismiss = () => {
        setVisible(false);
        sessionStorage.setItem("announcement-dismissed", "1");
    };

    if (!visible) return null;

    return (
        <div className="bg-zen-dark text-zen-bone w-full h-9 flex items-center justify-center relative overflow-hidden z-60">
            <p className="font-sans text-[10px] sm:text-xs tracking-[0.15em] uppercase text-center px-8">
                <span className="hidden sm:inline">Envío gratuito en pedidos +40€ · Entrega en 24-48h</span>
                <span className="sm:hidden">Envío gratis +40€ · 24-48h</span>
            </p>
            <button
                onClick={dismiss}
                aria-label="Cerrar anuncio"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zen-bone/60 hover:text-white transition-colors p-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}
