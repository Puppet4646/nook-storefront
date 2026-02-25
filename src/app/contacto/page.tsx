import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactoPage() {
    return (
        <div className="bg-[#FAF9F6] min-h-screen">
            <Header />

            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">

                        {/* Contact Info */}
                        <div className="flex flex-col justify-center">
                            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-zen-sage mb-4 block">Conecta con Nook</span>
                            <h1 className="font-serif text-3xl md:text-5xl text-zen-dark mb-6 md:mb-10 italic">Estamos aquí para acompañarte en tu ritual.</h1>

                            <div className="space-y-12">
                                <div>
                                    <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-zen-sage/60 mb-3">Atención al Cliente</h3>
                                    <p className="font-serif text-xl text-zen-dark">hola@nookspecialty.es</p>
                                    <p className="font-sans text-xs text-zen-dark/60 mt-2">Respondemos en menos de 24h laborables.</p>
                                </div>

                                <div>
                                    <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-zen-sage/60 mb-3">Redes Sociales</h3>
                                    <div className="flex gap-6">
                                        <a href="#" className="font-serif text-lg text-zen-dark border-b border-zen-sage/20 hover:border-zen-dark transition-all">Instagram</a>
                                        <a href="#" className="font-serif text-lg text-zen-dark border-b border-zen-sage/20 hover:border-zen-dark transition-all">Pinterest</a>
                                    </div>
                                </div>

                                <div className="bg-zen-sage/5 p-8 rounded-sm border border-zen-sage/10">
                                    <p className="font-serif text-lg text-zen-dark mb-2">¿Buscas algo específico?</p>
                                    <p className="font-sans text-xs text-zen-dark/70 leading-relaxed">
                                        Si eres un restaurante o tienda y quieres ofrecer nuestras especialidades, indícalo en el formulario o escríbenos a wholesale@nookspecialty.es
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-6 md:p-12 shadow-sm border border-zen-sage/5">
                            <form className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-sans text-[10px] uppercase tracking-widest text-zen-sage">Nombre</label>
                                        <input type="text" className="bg-transparent border-b border-zen-sage/20 py-2 outline-none focus:border-zen-dark transition-colors font-sans text-sm" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-sans text-[10px] uppercase tracking-widest text-zen-sage">Email</label>
                                        <input type="email" className="bg-transparent border-b border-zen-sage/20 py-2 outline-none focus:border-zen-dark transition-colors font-sans text-sm" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-sans text-[10px] uppercase tracking-widest text-zen-sage">Asunto</label>
                                    <select className="bg-transparent border-b border-zen-sage/20 py-2 outline-none focus:border-zen-dark transition-colors font-sans text-sm cursor-pointer appearance-none">
                                        <option>Consulta General</option>
                                        <option>Estado de mi Pedido</option>
                                        <option>Suscripciones</option>
                                        <option>Venta al por mayor</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-sans text-[10px] uppercase tracking-widest text-zen-sage">Mensaje</label>
                                    <textarea rows={4} className="bg-transparent border-b border-zen-sage/20 py-2 outline-none focus:border-zen-dark transition-colors font-sans text-sm resize-none" />
                                </div>

                                <button className="w-full bg-zen-dark text-white py-5 rounded-sm tracking-[0.2em] text-xs font-sans uppercase hover:bg-zen-sage transition-all shadow-lg mt-4">
                                    Enviar Mensaje
                                </button>

                                <p className="text-[9px] text-center text-zen-sage/60 uppercase tracking-widest leading-loose">
                                    Al enviar este formulario, aceptas nuestra política de privacidad.
                                </p>
                            </form>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
