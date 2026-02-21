import { fetchPosts } from "@/lib/wp";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60; // Regenerar el blog cada 60s si hay posts nuevos.

export default async function BlogPage() {
    const posts = await fetchPosts();

    return (
        <main className="min-h-screen bg-zen-bone pt-32 pb-16 px-6">
            <section className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="font-serif text-4xl md:text-5xl text-zen-dark mb-4">Nook Journal</h1>
                <p className="text-zen-sage font-sans font-medium tracking-widest text-sm uppercase">
                    Cultura, Preparación y Entorno del Té
                </p>
            </section>

            <section className="max-w-5xl mx-auto">
                {posts.length === 0 ? (
                    <div className="text-center py-20 text-zen-sage/60 font-serif text-xl border border-zen-sage/20 rounded-md">
                        Aún no hay entradas publicadas.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any) => {
                            // Extraer media destacada embedida
                            const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];

                            // Lógica de fallback inteligente basada en palabras clave del título
                            let imageUrl = featuredMedia?.source_url;
                            if (!imageUrl) {
                                const title = post.title.rendered.toLowerCase();
                                if (title.includes("matcha")) imageUrl = "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80&w=800";
                                else if (title.includes("temperatura") || title.includes("preparación")) imageUrl = "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800";
                                else if (title.includes("terroir") || title.includes("origen")) imageUrl = "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800";
                                else imageUrl = "https://images.unsplash.com/photo-1544787210-2213d84ad96b?auto=format&fit=crop&q=80&w=800";
                            }

                            // Formateo de fecha Simple
                            const date = new Date(post.date).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            });

                            return (
                                <article key={post.id} className="group flex flex-col items-start">
                                    <Link href={`/blog/${post.slug}`} className="w-full relative aspect-[4/3] mb-4 overflow-hidden rounded-md bg-zen-light/50">
                                        <Image
                                            src={imageUrl}
                                            alt={post.title.rendered}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </Link>
                                    <span className="text-xs text-zen-sage uppercase tracking-widest font-semibold mb-2">
                                        {date}
                                    </span>
                                    <Link href={`/blog/${post.slug}`} className="hover:text-zen-primary transition-colors">
                                        <h2
                                            className="font-serif text-2xl text-zen-dark leading-tight mb-2"
                                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                        />
                                    </Link>
                                    <div
                                        className="text-sm text-zen-dark/70 font-sans line-clamp-3 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                    />
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}
