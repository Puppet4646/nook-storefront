import Image from "next/image";

export default function Storytelling() {
    return (
        <section className="relative w-full bg-zen-sage flex flex-col pt-24 pb-32 px-6 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Left Side: Typography */}
                <div className="z-10 order-2 md:order-1 flex flex-col">
                    <p className="text-zen-bone/80 font-sans text-xs font-medium tracking-[0.4em] mb-8 uppercase">
                        Nuestra Filosofía
                    </p>
                    <h2 className="font-serif text-zen-bone text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8">
                        Creemos en la pausa. En el <span className="italic">instante</span> donde el mundo se detiene y solo queda el aroma.
                    </h2>
                    <div className="max-w-xl">
                        <p className="text-zen-bone/90 font-sans font-light text-lg leading-relaxed mb-12">
                            Nuestra selección es un tributo a la paciencia. Desde los campos de té envueltos en niebla hasta el tostado artesanal, cada paso está diseñado para honrar el ritual de lo simple y lo excepcional.
                        </p>
                    </div>
                </div>

                {/* Right Side: Asymmetric Editorial Image */}
                <div className="relative order-1 md:order-2 w-full flex justify-center md:justify-end">
                    <div className="relative aspect-[3/4] w-full max-w-sm lg:max-w-md rounded-sm overflow-hidden shadow-2xl transform md:translate-x-8 md:translate-y-12">
                        <Image
                            src="https://images.unsplash.com/photo-1599321955726-e048426698dc?q=80&w=1000&auto=format&fit=crop"
                            alt="Preparación tradicional matcha té ceremonia zen"
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    {/* Decorative Element: Overflowing offset border */}
                    <div className="absolute top-4 right-4 md:top-8 md:-right-8 w-full max-w-sm lg:max-w-md aspect-[3/4] border border-zen-bone/30 rounded-sm -z-10 pointer-events-none transform md:translate-x-8 md:translate-y-12"></div>
                </div>
            </div>
        </section>
    );
}
