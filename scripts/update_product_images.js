import WooCommerceRestApiPkg from "@woocommerce/woocommerce-rest-api";
const WooCommerceRestApi = WooCommerceRestApiPkg.default || WooCommerceRestApiPkg;
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WC_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3",
    queryStringAuth: true
});

const updates = [
    {
        id: 29313,
        images: [
            { id: 29324 },
            { id: 29325 },
            { id: 29326 }
        ]
    },
    {
        id: 29315,
        images: [
            { id: 29327 },
            { id: 29328 },
            { id: 29329 },
            { id: 29330 }
        ]
    }
];

async function updateProducts() {
    for (const u of updates) {
        try {
            await api.put(`products/${u.id}`, { images: u.images });
            console.log(`✅ Updated product ${u.id} with ${u.images.length} images.`);
        } catch (e) {
            console.error(`❌ Error updating ${u.id}:`, e.response ? e.response.data : e.message);
        }
    }
}

updateProducts();
