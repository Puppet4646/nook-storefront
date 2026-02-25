import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import dotenv from "dotenv";
import path from "path";
// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WC_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3",
    queryStringAuth: true
});

const categories = {
    tes: 94,
    infusiones: 110,
    accesorios: 79
};

const products = [
    // TÉS (94)
    { name: "Té Matcha Ceremonial A+", category: "tes", price: "24.90", image: "https://images.unsplash.com/photo-1582793988951-9aed55099991?auto=format&fit=crop&q=80&w=800" },
    { name: "Senzha Green Tea", category: "tes", price: "14.50", image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=800" },
    { name: "Earl Grey Imperial", category: "tes", price: "12.80", image: "https://images.unsplash.com/photo-1594631252845-29fc458695d6?auto=format&fit=crop&q=80&w=800" },
    { name: "White Peony (Bai Mu Dan)", category: "tes", price: "18.20", image: "https://images.unsplash.com/photo-1544787210-22bc3905c1e0?auto=format&fit=crop&q=80&w=800" },
    { name: "Jasmin Dragon Pearls", category: "tes", price: "22.00", image: "https://images.unsplash.com/photo-1626071465942-eafbe734208a?auto=format&fit=crop&q=80&w=800" },
    { name: "Oolong Tie Guan Yin", category: "tes", price: "19.50", image: "https://images.unsplash.com/photo-1576092768241-dec231b80216?auto=format&fit=crop&q=80&w=800" },
    { name: "Pu-erh Vintage 2018", category: "tes", price: "28.00", image: "https://images.unsplash.com/photo-1515696955266-4f67e13219e8?auto=format&fit=crop&q=80&w=800" },
    { name: "Genmaicha Popcorn", category: "tes", price: "13.90", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=800" },
    { name: "Assam TGFOP1", category: "tes", price: "11.50", image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&q=80&w=800" },
    { name: "Lapsang Souchong (Smoked)", category: "tes", price: "15.00", image: "https://images.unsplash.com/photo-1594631252845-29fc458695d6?auto=format&fit=crop&q=80&w=800" },

    // INFUSIONES (110)
    { name: "Rooibos Vainilla Bourbon", category: "infusiones", price: "10.90", image: "https://images.unsplash.com/photo-1515696955266-4f67e13219e8?auto=format&fit=crop&q=80&w=800" },
    { name: "Manzanilla Silvestre", category: "infusiones", price: "8.50", image: "https://images.unsplash.com/photo-1606051512423-f38fca64379a?auto=format&fit=crop&q=80&w=800" },
    { name: "Menta Piperita Intensa", category: "infusiones", price: "9.20", image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&q=80&w=800" },
    { name: "Brisa Mediterránea (Hierbas)", category: "infusiones", price: "11.00", image: "https://images.unsplash.com/photo-1523906630133-f1c8411bc2f0?auto=format&fit=crop&q=80&w=800" },
    { name: "Detox Jengibre & Limón", category: "infusiones", price: "12.50", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800" },
    { name: "Sueño Profundo (Lavanda)", category: "infusiones", price: "13.80", image: "https://images.unsplash.com/photo-1499245105200-a633364f3c05?auto=format&fit=crop&q=80&w=800" },
    { name: "Hibiscus & Frutos Rojos", category: "infusiones", price: "10.50", image: "https://images.unsplash.com/photo-1546270634-118fbc780337?auto=format&fit=crop&q=80&w=800" },
    { name: "Chai Spices (Sin Teína)", category: "infusiones", price: "14.00", image: "https://images.unsplash.com/photo-1544480544-fc02a969b4e5?auto=format&fit=crop&q=80&w=800" },
    { name: "Poleo Mentha Ritual", category: "infusiones", price: "9.00", image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&q=80&w=800" },
    { name: "Tila Alpina Premium", category: "infusiones", price: "11.20", image: "https://images.unsplash.com/photo-1606051512423-f38fca64379a?auto=format&fit=crop&q=80&w=800" },

    // ACCESORIOS (79)
    { name: "Tetera de Hierro Tetsubin", category: "accesorios", price: "65.00", image: "https://images.unsplash.com/photo-1576092768241-dec231b80216?auto=format&fit=crop&q=80&w=800" },
    { name: "Cuenco Matcha Chawan", category: "accesorios", price: "32.00", image: "https://images.unsplash.com/photo-1582793988951-9aed55099991?auto=format&fit=crop&q=80&w=800" },
    { name: "Batidor de Bambú Chasen", category: "accesorios", price: "18.50", image: "https://images.unsplash.com/photo-1594631252845-29fc458695d6?auto=format&fit=crop&q=80&w=800" },
    { name: "Cuchara Medidora Oro Rosa", category: "accesorios", price: "9.90", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eea50f5?auto=format&fit=crop&q=80&w=800" },
    { name: "Infusor de Cristal Zen", category: "accesorios", price: "15.00", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800" },
    { name: "Set de Degustación Porcelana", category: "accesorios", price: "45.00", image: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&q=80&w=800" },
    { name: "Bote de Latón Hermético", category: "accesorios", price: "14.20", image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=800" },
    { name: "Termómetro Digital Precision", category: "accesorios", price: "22.50", image: "https://images.unsplash.com/photo-1587049352847-81a56d773cae?auto=format&fit=crop&q=80&w=800" },
    { name: "Bandeja de Bambú Tallada", category: "accesorios", price: "29.00", image: "https://images.unsplash.com/photo-1563245372-f21724e3993d?auto=format&fit=crop&q=80&w=800" },
    { name: "Filtro de Tela Tradicional", category: "accesorios", price: "5.50", image: "https://images.unsplash.com/photo-1544787210-22bc3905c1e0?auto=format&fit=crop&q=80&w=800" }
];

async function createProducts() {
    console.log(`Starting generation of ${products.length} products...`);

    for (const p of products) {
        const data = {
            name: p.name,
            type: "simple",
            regular_price: p.price,
            description: `Descubre la esencia de ${p.name}. Una selección exclusiva de Nook Specialty para elevar tus rituales diarios.`,
            short_description: `Producto premium de la colección ${p.category}.`,
            categories: [
                { id: categories[p.category] }
            ],
            status: "publish"
        };

        try {
            const response = await api.post("products", data);
            console.log(`✅ Created: ${response.data.name} (ID: ${response.data.id})`);
        } catch (error) {
            console.error(`❌ Error creating ${p.name}:`, error.response ? error.response.data : error.message);
        }
    }

    console.log("Done!");
}

createProducts();
