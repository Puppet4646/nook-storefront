import { fetchProducts } from '@/lib/woo';
import { fetchPosts } from '@/lib/wp';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import FeaturedCategories from '@/components/FeaturedCategories';
import Storytelling from '@/components/Storytelling';
import NewsletterBanner from '@/components/NewsletterBanner';
import ProductImage from '@/components/ProductImage';
import Link from 'next/link';

export default async function Home() {
  const originalProducts = await fetchProducts();
  const products = originalProducts.map(p => {
      if (p.slug === 'filtro-de-tela-tradicional') {
          return { ...p, images: [{ id: 99999, src: '/images/filtro-tela.jpg', alt: 'Filtro de Tela Tradicional' }] };
      }
      return p;
  });
  const blogPosts = await fetchPosts();
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <main>
      <Hero />
      <TrustBadges />
      <FeaturedCategories />
      <Storytelling />

      {/* Latest Products Section — Richer Cards */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-zen-sage mb-2 block">Selección de Temporada</span>
            <h2 className="font-serif text-2xl md:text-3xl text-zen-dark italic">Novedades en Tienda</h2>
          </div>
          <Link href="/tienda" className="font-sans text-[10px] uppercase tracking-[0.2em] text-zen-sage hover:text-zen-dark transition-colors border-b border-zen-sage/20 pb-1 hidden sm:inline">Ver Catálogo</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
          {products.slice(0, 3).map((p) => {
            const shortDesc = p.short_description
              ? p.short_description.replace(/<[^>]+>/g, '').slice(0, 100)
              : '';
            const categories = p.categories?.map((c) => c.name) || [];

            return (
              <Link key={p.id} href={`/producto/${p.slug}`} className="group cursor-pointer block">
                <div className="relative aspect-4/5 overflow-hidden bg-[#F5F5F0] mb-4 md:mb-6 rounded-sm">
                  <ProductImage
                    src={p.images?.[0]?.src}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Category Pills */}
                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {categories.slice(0, 2).map((cat: string) => (
                      <span
                        key={cat}
                        className="font-sans text-[9px] uppercase tracking-widest text-zen-sage bg-zen-sage/10 px-2.5 py-1 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                <h3 className="font-serif text-base md:text-lg text-zen-dark mb-1.5 transition-colors group-hover:text-zen-sage line-clamp-2">
                  {p.name}
                </h3>

                {/* Short Description */}
                {shortDesc && (
                  <p className="font-sans text-xs text-zen-dark/60 mb-2 line-clamp-2 leading-relaxed font-light">
                    {shortDesc}
                  </p>
                )}

                <div className="font-sans text-xs text-zen-sage tracking-widest uppercase font-medium" dangerouslySetInnerHTML={{ __html: p.price_html || '' }} />
              </Link>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/tienda" className="inline-block font-sans text-[10px] uppercase tracking-[0.2em] text-zen-sage hover:text-zen-dark transition-all border border-zen-sage/30 px-8 py-4 hover:bg-zen-sage/5">
            Ver Catálogo Completo
          </Link>
        </div>
      </section>

      {/* Newsletter Incentive Banner */}
      <NewsletterBanner />

      {/* Journal / Blog Preview Section */}
      <section className="bg-zen-bone py-16 md:py-24 border-y border-zen-sage/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-zen-sage mb-2 block">Lectura &amp; Cultura</span>
            <h2 className="font-serif text-3xl md:text-4xl text-zen-dark">Últimas entradas</h2>
            <div className="w-12 h-px bg-zen-sage/30 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
            {latestPosts.map((post: { id: number; slug: string; title: { rendered: string }; excerpt?: { rendered: string }; _embedded?: { 'wp:featuredmedia'?: { source_url: string }[] } }) => {
              const title = post.title.rendered.toLowerCase();
              let imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

              if (!imageUrl) {
                if (title.includes("matcha")) imageUrl = "/images/blog-matcha.jpg";
                else if (title.includes("temperatura") || title.includes("preparación")) imageUrl = "/images/blog-preparation.jpg";
                else if (title.includes("terroir") || title.includes("origen")) imageUrl = "/images/blog-terroir.jpg";
                else imageUrl = "/images/blog-generic.jpg";
              }

              return (
                <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                  <div className="relative aspect-video overflow-hidden mb-6">
                    <ProductImage
                      src={imageUrl}
                      alt={post.title.rendered}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-20 group-hover:grayscale-0"
                    />
                  </div>
                  <h3 className="font-serif text-xl text-zen-dark mb-3 leading-snug group-hover:text-zen-sage transition-colors" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <p className="font-sans text-xs text-zen-sage/80 line-clamp-2 uppercase tracking-tight leading-loose" dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '' }} />
                </Link>
              );
            })}
          </div>

          <div className="mt-10 md:mt-16 text-center">
            <Link href="/blog" className="inline-block font-sans text-[10px] uppercase tracking-[0.2em] text-zen-sage hover:text-zen-dark transition-all border border-zen-sage/30 px-8 py-4 hover:bg-zen-sage/5">Explorar Blog</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
