"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const faqs = [
    {
        category: "Envíos",
        questions: [
            { q: "¿Cuánto tarda en llegar mi pedido?", a: "Los pedidos a la península suelen tardar entre 24 y 48 horas laborables. Para Baleares y Canarias, el tiempo estimado es de 3 a 5 días." },
            { q: "¿Cuáles son los gastos de envío?", a: "El envío es gratuito en pedidos superiores a 45€. Para pedidos inferiores, el coste es de 4,90€." }
        ]
    },
    {
        category: "Producto",
        questions: [
            { q: "¿Cómo debo conservar mi té?", a: "Recomendamos mantener el té en un lugar fresco, seco y alejado de la luz solar directa. Nuestros envases están diseñados para proteger la frescura, pero asegúrate de cerrarlos bien tras cada uso." },
            { q: "¿Tenéis opciones sin cafeína?", a: "Sí, contamos con una cuidada selección de infusiones botánicas y rooibos que son naturalmente libres de cafeína (o teína)." }
        ]
    },
    {
        category: "Pedidos",
        questions: [
            { q: "¿Puedo modificar un pedido ya realizado?", a: "Si tu pedido aún no ha salido de nuestro almacén, podemos hacer cambios. Escríbenos lo antes posible a hola@nookspecialty.es con tu número de pedido." },
            { q: "¿Qué métodos de pago aceptáis?", a: "Aceptamos tarjetas Visa, Mastercard, American Express, así como Apple Pay y Google Pay para una compra rápida y segura." }
        ]
    }
];

function AccordionItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-zen-sage/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left group"
            >
                <span className="font-serif text-lg text-zen-dark group-hover:text-zen-sage transition-colors">{question}</span>
                <span className={`transform transition-transform duration-300 text-zen-sage ${isOpen ? 'rotate-45' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                <p className="font-sans text-sm text-zen-dark/70 leading-relaxed pr-12">
                    {answer}
                </p>
            </div>
        </div>
    );
}

export default function FAQPage() {
    return (
        <div className="bg-[#FAF9F6] min-h-screen">
            <Header />

            <main className="pt-32 pb-24">
                <div className="max-w-3xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-12 md:mb-20">
                        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-zen-sage mb-4 block">Preguntas Frecuentes</span>
                        <h1 className="font-serif text-3xl md:text-5xl text-zen-dark italic">Resolviendo tus dudas.</h1>
                    </div>

                    <div className="space-y-16">
                        {faqs.map((group, idx) => (
                            <div key={idx}>
                                <h3 className="font-sans text-[10px] uppercase tracking-[0.4em] text-zen-sage mb-6">{group.category}</h3>
                                <div className="border-t border-zen-sage/10">
                                    {group.questions.map((item, qidx) => (
                                        <AccordionItem key={qidx} question={item.q} answer={item.a} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 md:mt-24 p-8 md:p-12 bg-zen-dark text-white text-center rounded-sm shadow-2xl">
                        <h2 className="font-serif text-2xl italic mb-4">¿No encuentras lo que buscas?</h2>
                        <p className="font-sans text-xs text-white/60 mb-8 uppercase tracking-widest">Estamos encantados de hablar contigo.</p>
                        <a href="/contacto" className="inline-block border border-white/30 px-10 py-4 font-sans text-[10px] uppercase tracking-widest hover:bg-white hover:text-zen-dark transition-all">Ir a Contacto</a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
