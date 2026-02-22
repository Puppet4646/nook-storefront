import { fetchProducts } from '@/lib/woo';
import { fetchPosts } from '@/lib/wp';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import Storytelling from '@/components/Storytelling';
import ProductImage from '@/components/ProductImage';
import Link from 'next/link';

export default async function Home() {
  const products = await fetchProducts();
  const blogPosts = await fetchPosts();
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <main>
      <Hero />
      <FeaturedCategories />
      <Storytelling />

      {/* Latest Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-zen-sage mb-2 block">Selección de Temporada</span>
            <h2 className="font-serif text-3xl text-zen-dark italic">Novedades en Tienda</h2>
          </div>
          <Link href="/tienda" className="font-sans text-[10px] uppercase tracking-[0.2em] text-zen-sage hover:text-zen-dark transition-colors border-b border-zen-sage/20 pb-1">Ver Catálogo</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.slice(0, 3).map((p: any) => (
            <div key={p.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F0] mb-6">
                <ProductImage
                  src={p.images?.[0]?.src}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-lg text-zen-dark mb-1">{p.name}</h3>
              <div className="font-sans text-xs text-zen-sage tracking-widest uppercase" dangerouslySetInnerHTML={{ __html: p.price_html }} />
            </div>
          ))}
        </div>
      </section>

      {/* Journal / Blog Preview Section */}
      <section className="bg-[#FAF9F6] py-24 border-y border-zen-sage/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-zen-sage mb-2 block">Lectura & Cultura</span>
            <h2 className="font-serif text-4xl text-zen-dark">Nook Journal</h2>
            <div className="w-12 h-[1px] bg-zen-sage/30 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {latestPosts.map((post: any) => {
              const title = post.title.rendered.toLowerCase();
              let imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

              if (!imageUrl) {
                if (title.includes("matcha")) imageUrl = "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&q=80&w=800";
                else if (title.includes("temperatura") || title.includes("preparación")) imageUrl = "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800";
                else if (title.includes("terroir") || title.includes("origen")) imageUrl = "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800";
                else imageUrl = "https://images.unsplash.com/photo-1544787210-2213d84ad96b?auto=format&fit=crop&q=80&w=800";
              }

              return (
                <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                  <div className="relative aspect-video overflow-hidden mb-6">
                    <ProductImage
                      src={imageUrl}
                      alt={post.title.rendered}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                    />
                  </div>
                  <h3 className="font-serif text-xl text-zen-dark mb-3 leading-snug group-hover:text-zen-sage transition-colors" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <p className="font-sans text-xs text-zen-sage/80 line-clamp-2 uppercase tracking-tight leading-loose" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.replace(/<[^>]+>/g, '') }} />
                </Link>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Link href="/blog" className="inline-block font-sans text-[10px] uppercase tracking-[0.2em] text-zen-sage hover:text-zen-dark transition-all border border-zen-sage/30 px-8 py-4 hover:bg-zen-sage/5">Explorar Journal</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
