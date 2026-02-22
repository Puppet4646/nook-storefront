import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NosotrosPage() {
    return (
        <div className="bg-[#FAF9F6] min-h-screen">
            <Header />

            <main className="pt-24">
                {/* Hero Section */}
                <section className="relative h-[70vh] w-full overflow-hidden">
                    <Image
                        src="/images/nook-about-hero.png"
                        alt="El arte del té en Nook Specialty"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="text-center px-6">
                            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/90 mb-4 block">Desde el Origen</span>
                            <h1 className="font-serif text-5xl md:text-7xl text-white italic tracking-tight">Nuestra Historia</h1>
                        </div>
                    </div>
                </section>

                {/* Manifesto Section */}
                <section className="max-w-4xl mx-auto px-6 py-24 text-center">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-zen-sage mb-8 block">El Manifiesto Nook</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-zen-dark mb-10 leading-snug">
                        Creemos en la belleza de la pausa y en la pureza de lo que nos rodea.
                    </h2>
                    <div className="space-y-6 text-zen-dark/80 font-sans text-sm leading-relaxed max-w-2xl mx-auto text-justify md:text-center">
                        <p>
                            Nook Specialty nació de una búsqueda incansable por la calma en un mundo que nunca se detiene. Lo que comenzó como un refugio personal, se convirtió en una curaduría de los tés y botánicos más excepcionales del mundo.
                        </p>
                        <p>
                            No solo vendemos té; compartimos un ritual. Cada mezcla es una invitación a reconectar, a sentir la textura de la cerámica tibia entre las manos y el aroma que nos transporta a paisajes remotos.
                        </p>
                    </div>
                    <div className="w-12 h-[1px] bg-zen-sage/30 mx-auto mt-16"></div>
                </section>

                {/* Values Grid */}
                <section className="max-w-7xl mx-auto px-6 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div className="text-center">
                            <span className="font-serif text-4xl text-zen-sage/20 block mb-4">01</span>
                            <h3 className="font-serif text-xl text-zen-dark mb-4 italic">Origen Consciente</h3>
                            <p className="text-zen-dark/70 text-xs leading-loose tracking-wide">
                                Trabajamos con pequeños productores que respetan la tierra y los ciclos naturales de la planta.
                            </p>
                        </div>
                        <div className="text-center">
                            <span className="font-serif text-4xl text-zen-sage/20 block mb-4">02</span>
                            <h3 className="font-serif text-xl text-zen-dark mb-4 italic">Calidad Alquímica</h3>
                            <p className="text-zen-dark/70 text-xs leading-loose tracking-wide">
                                Cada hoja y pétalo es seleccionado por su perfil aromático y pureza, sin aditivos artificiales.
                            </p>
                        </div>
                        <div className="text-center">
                            <span className="font-serif text-4xl text-zen-sage/20 block mb-4">03</span>
                            <h3 className="font-serif text-xl text-zen-dark mb-4 italic">El Ritual Real</h3>
                            <p className="text-zen-dark/70 text-xs leading-loose tracking-wide">
                                Diseñamos experiencias para que el acto de preparar un té sea el momento más sagrado de tu día.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Ending Section */}
                <section className="bg-zen-dark text-[#FAF9F6] py-24">
                    <div className="max-w-3xl mx-auto px-6 text-center">
                        <h2 className="font-serif text-3xl mb-8 italic">Bienvenido a tu rincón de paz.</h2>
                        <p className="font-sans text-xs tracking-widest uppercase opacity-60 mb-12">Nook Specialty Tea</p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
