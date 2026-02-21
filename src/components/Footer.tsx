export default function Footer() {
    return (
        <footer className="bg-zen-dark text-zen-bone px-6 pt-24 pb-12 w-full mt-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">

                {/* Brand & Newsletter Column */}
                <div className="md:col-span-2">
                    <h2 className="font-serif text-3xl font-medium mb-1">Nook</h2>
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-zen-sage-light mb-6">Coffee & Tea Specialty</p>
                    <p className="font-sans font-light text-zen-bone/80 mb-8 max-w-sm">
                        Suscríbete a nuestra newsletter para recibir notas de cata, invitaciones a talleres online y acceso anticipado a cosechas limitadas.
                    </p>
                    <form className="flex w-full max-w-md border-b text-zen-bone border-zen-sage pb-2 group focus-within:border-white transition-colors">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            className="bg-transparent border-none outline-none w-full font-sans font-light placeholder:text-zen-sage text-sm focus:ring-0"
                            required
                        />
                        <button type="submit" className="uppercase font-sans font-semibold text-xs tracking-widest hover:text-white text-zen-sage transition-colors pl-4">
                            Unirse
                        </button>
                    </form>
                </div>

                {/* Navigation Column */}
                <div>
                    <h3 className="uppercase font-sans font-semibold text-xs tracking-widest text-[#8C9A7B] mb-6">Explorar</h3>
                    <ul className="flex flex-col gap-4 font-sans font-light text-sm text-zen-bone/80">
                        <li><a href="#" className="hover:text-white transition-colors">Tienda</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Suscripciones</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Nuestra Filosofía</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Talleres & Catas</a></li>
                    </ul>
                </div>

                {/* Contact/Legal Column */}
                <div>
                    <h3 className="uppercase font-sans font-semibold text-xs tracking-widest text-[#8C9A7B] mb-6">Asistencia</h3>
                    <ul className="flex flex-col gap-4 font-sans font-light text-sm text-zen-bone/80">
                        <li><a href="#" className="hover:text-white transition-colors">Envíos y Devoluciones</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                    </ul>
                </div>

            </div>

            {/* Bottom Legal & Copyright Bar */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-zen-sage/30 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-sans font-light text-zen-sage">
                <p>&copy; {new Date().getFullYear()} Nook. Todos los derechos reservados.</p>
                <div className="flex flex-wrap justify-center gap-6">
                    <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
                    <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
                    <a href="#" className="hover:text-white transition-colors">Política de Cookies</a>
                </div>
            </div>
        </footer>
    );
}
