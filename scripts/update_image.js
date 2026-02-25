const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WC_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3"
});

async function run() {
    try {
        console.log("Searching for product: filtro-de-tela-tradicional");
        const { data: products } = await api.get("products", { slug: "filtro-de-tela-tradicional" });
        if (!products.length) {
            console.log("Product not found");
            return;
        }
        const product = products[0];
        console.log(`Found product ID: ${product.id}`);

        // We can't easily upload media via the basic REST API without a full WordPress application password or media endpoint
        // Let's check if we can just update the src if it's already hosted, or if we need to put it in the public folder and link it.
        // Wait, WooCommerce requires a URL for images. If I just put it in public folder it won't be in WC.
        // Let's assume the user wants it in WooCommerce.
        // Wait, standard WooCommerce API *does* allow creating images by passing a src URL. But it has to be publicly accessible.
        // Since we are on localhost, WooCommerce (if hosted remotely) can't reach our localhost URL.

        console.log("Product details:", product.name);
    } catch (error) {
        console.log("Error:", error.response ? error.response.data : error.message);
    }
}

run();
