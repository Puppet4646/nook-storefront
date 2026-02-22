import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[#FAF9F6] min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-24">
                <article className="max-w-4xl mx-auto px-6 prose prose-zen">
                    {children}
                </article>
            </main>
            <Footer />
        </div>
    );
}
