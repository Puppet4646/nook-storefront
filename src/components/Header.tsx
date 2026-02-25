"use client";

import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { useState, useEffect } from 'react';

export default function Header() {
    const cartCount = useCartStore((state) => state.cartCount());
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    return (
        <>
            <header className="fixed top-9 left-0 right-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-zen-sage/10 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={isMenuOpen}
                        className="md:hidden flex items-center justify-center w-10 h-10 -ml-1 text-zen-dark relative z-60"
                    >
                        <div className="w-5 h-4 flex flex-col justify-between">
                            <span className={`block h-[1.5px] w-full bg-current transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                            <span className={`block h-[1.5px] w-full bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                            <span className={`block h-[1.5px] w-full bg-current transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 font-sans font-medium text-xs tracking-[0.15em] uppercase text-zen-sage">
                        <Link href="/tienda" className="hover:text-zen-dark transition-colors">Tienda</Link>
                        <Link href="/blog" className="hover:text-zen-dark transition-colors">Blog</Link>
                    </nav>

                    {/* Logo */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Link href="/" onClick={() => setIsMenuOpen(false)}>
                            <h1 className="font-serif text-xl md:text-3xl text-zen-dark tracking-tight flex flex-col items-center justify-center">
                                Nook
                                <span className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-zen-sage/80 mt-0.5 block">Coffee & Tea Specialty</span>
                            </h1>
                        </Link>
                    </div>

                    {/* Right Icons (Search & Cart) */}
                    <div className="flex items-center gap-4 md:gap-6">
                        <button aria-label="Search" className="text-zen-dark hover:text-zen-sage transition-colors p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <button aria-label="Cart" className="relative text-zen-dark hover:text-zen-sage transition-colors p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className="absolute -top-1 -right-1 bg-zen-sage text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        </button>
                    </div>

                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <nav
                className={`fixed top-[100px] left-0 bottom-0 w-4/5 max-w-xs bg-[#FAF9F6] z-40 md:hidden transform transition-transform duration-300 ease-out shadow-2xl ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                aria-hidden={!isMenuOpen}
            >
                <div className="flex flex-col h-full pt-8 pb-12 px-8">
                    {/* Navigation Links */}
                    <div className="flex flex-col gap-1">
                        <Link
                            href="/tienda"
                            onClick={() => setIsMenuOpen(false)}
                            className="font-serif text-2xl text-zen-dark py-4 border-b border-zen-sage/10 hover:text-zen-sage transition-colors"
                        >
                            Tienda
                        </Link>
                        <Link
                            href="/blog"
                            onClick={() => setIsMenuOpen(false)}
                            className="font-serif text-2xl text-zen-dark py-4 border-b border-zen-sage/10 hover:text-zen-sage transition-colors"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/nosotros"
                            onClick={() => setIsMenuOpen(false)}
                            className="font-serif text-2xl text-zen-dark py-4 border-b border-zen-sage/10 hover:text-zen-sage transition-colors"
                        >
                            Nuestra Filosofía
                        </Link>
                        <Link
                            href="/contacto"
                            onClick={() => setIsMenuOpen(false)}
                            className="font-serif text-2xl text-zen-dark py-4 border-b border-zen-sage/10 hover:text-zen-sage transition-colors"
                        >
                            Contacto
                        </Link>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-auto">
                        <div className="border-t border-zen-sage/20 pt-6">
                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-zen-sage/60 mb-4">Síguenos</p>
                            <div className="flex gap-6">
                                <a href="#" className="font-sans text-sm text-zen-dark hover:text-zen-sage transition-colors">Instagram</a>
                                <a href="#" className="font-sans text-sm text-zen-dark hover:text-zen-sage transition-colors">Pinterest</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
