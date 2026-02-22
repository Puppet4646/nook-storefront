"use client";

import Link from 'next/link';
import { useCartStore } from '@/store/cart';

export default function Header() {
    const cartCount = useCartStore((state) => state.cartCount());

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-zen-sage/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Mobile Menu Icon (Visual Only for Prototype) */}
                <div className="md:hidden flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zen-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 font-sans font-medium text-xs tracking-[0.15em] uppercase text-zen-sage">
                    <Link href="/tienda" className="hover:text-zen-dark transition-colors">Tienda</Link>
                    <Link href="/blog" className="hover:text-zen-dark transition-colors">Blog</Link>
                </nav>

                {/* Logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link href="/">
                        <h1 className="font-serif text-2xl md:text-3xl text-zen-dark tracking-tight flex flex-col items-center justify-center">
                            Nook
                            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-zen-sage/80 mt-1 block">Coffee & Tea Specialty</span>
                        </h1>
                    </Link>
                </div>

                {/* Right Icons (Search & Cart) */}
                <div className="flex items-center gap-6">
                    <button aria-label="Search" className="text-zen-dark hover:text-zen-sage transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <button aria-label="Cart" className="relative text-zen-dark hover:text-zen-sage transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="absolute -top-1.5 -right-1.5 bg-zen-sage text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                            {cartCount}
                        </span>
                    </button>
                </div>

            </div>
        </header>
    );
}
