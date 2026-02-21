import { fetchPostBySlug, fetchPosts } from "@/lib/wp";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// SSG: Generar las rutas de los artículos en tiempo de construcción (o primer acceso)
export async function generateStaticParams() {
    const posts = await fetchPosts();
    // Retornamos el array de params para next
    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await fetchPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    let imageUrl = featuredMedia?.source_url;

    if (!imageUrl) {
        const title = post.title.rendered.toLowerCase();
        if (title.includes("matcha")) imageUrl = "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80&w=1200";
        else if (title.includes("temperatura") || title.includes("preparación")) imageUrl = "https://images.unsplash.com/photo-1594631252845-29fc458681b3?auto=format&fit=crop&q=80&w=1200";
        else if (title.includes("terroir") || title.includes("origen")) imageUrl = "https://images.unsplash.com/photo-1559839914-17aae19ceafl?auto=format&fit=crop&q=80&w=1200";
        else imageUrl = "https://images.unsplash.com/photo-1544787210-2213d84ad96b?auto=format&fit=crop&q=80&w=1200";
    }

    // Formato fecha
    const date = new Date(post.date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <main className="min-h-screen bg-zen-light pt-32 pb-24">

            <article className="max-w-3xl mx-auto px-6">

                {/* Header del Artículo */}
                <header className="mb-12 text-center">
                    <p className="text-zen-sage uppercase tracking-widest text-[10px] font-semibold mb-6">
                        {date} — Nook Journal
                    </p>
                    <h1
                        className="font-serif text-3xl md:text-5xl lg:text-6xl text-zen-dark leading-[1.1] mb-8"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                </header>

                {/* Imagen Destacada Ancha */}
                {imageUrl && (
                    <div className="w-full relative aspect-[16/9] md:aspect-[21/9] rounded-md overflow-hidden mb-16 shadow-sm border border-zen-sage/10">
                        <Image
                            src={imageUrl}
                            alt={post.title.rendered}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Contenido HTML de WordPress con CSS nativo de Tailwind */}
                <div
                    className="max-w-2xl mx-auto
                               [&>h1]:font-serif [&>h1]:text-3xl [&>h1]:text-zen-dark [&>h1]:mb-6
                               [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:text-zen-dark [&>h2]:mb-4 [&>h2]:mt-8
                               [&>h3]:font-serif [&>h3]:text-xl [&>h3]:text-zen-dark [&>h3]:mb-4 [&>h3]:mt-6
                               [&>p]:font-sans [&>p]:text-zen-dark/80 [&>p]:leading-relaxed [&>p]:mb-6
                               [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>ul>li]:text-zen-dark/80
                               [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2 [&>ol>li]:text-zen-dark/80
                               [&>a]:text-zen-primary [&>a]:underline [&>a]:underline-offset-4 hover:[&>a]:text-zen-dark
                               [&>strong]:text-zen-dark [&>strong]:font-semibold
                               [&>img]:rounded-md [&>img]:shadow-sm [&>img]:my-8 [&>img]:w-full [&>img]:object-cover"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />

                {/* Footer del Artículo */}
                <footer className="mt-20 pt-10 border-t border-zen-sage/20 text-center flex flex-col items-center">
                    <p className="text-sm font-sans text-zen-sage mb-6 italic">
                        "La belleza de las cosas sencillas."
                    </p>
                    <Link href="/blog" className="inline-block border border-zen-dark text-zen-dark px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-zen-dark hover:text-white transition-colors">
                        Volver al Journal
                    </Link>
                </footer>
            </article>

        </main>
    );
}
