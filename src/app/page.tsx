import { fetchProducts, fetchCategories } from '@/lib/woo';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import Storytelling from '@/components/Storytelling';

export default async function Home() {
  // Fetch data natively on the server before sending to client
  const products = await fetchProducts();
  const categories = await fetchCategories();

  return (
    <main>
      <Hero />
      <FeaturedCategories />
      <Storytelling />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="mb-12">
          <h2 className="text-2xl mb-4 text-[#8C9A7B]">Catalog Categories ({categories.length})</h2>
          <div className="flex gap-4 flex-wrap">
            {categories.map((cat: { id: number, name: string, count: number }) => (
              <span key={cat.id} className="px-4 py-2 border border-[#8C9A7B] text-sm uppercase tracking-wide">
                {cat.name} ({cat.count})
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl mb-4 text-[#8C9A7B]">Latest Live Products ({products.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p: { id: number, name: string, price_html: string, images?: { src: string }[] }) => (
              <div key={p.id} className="bg-white p-6 shadow-sm">
                {p.images?.[0] && (
                  <img src={p.images[0].src} alt={p.name} className="w-full h-48 object-cover mb-4" />
                )}
                <h3 className="font-serif text-lg mb-2">{p.name}</h3>
                <div className="text-sm text-gray-500 mb-2" dangerouslySetInnerHTML={{ __html: p.price_html }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
