"use client";

import { useState } from "react";

interface AccordionProps {
    title: string;
    content: React.ReactNode;
}

export default function ProductAccordion({ title, content }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-zen-sage/20 py-6 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between group focus:outline-none"
            >
                <span className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-zen-dark/80">{title}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-zen-sage transition-transform duration-300 ${isOpen ? 'rotate-90' : 'group-hover:translate-x-1'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </button>

            <div
                className={`transition-all duration-300 ease-in-out origin-top ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
            >
                <div className="font-sans font-light text-sm text-zen-dark/70 leading-relaxed pr-6">
                    {content}
                </div>
            </div>
        </div>
    );
}
