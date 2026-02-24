import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Helper to get sanitized env variables
const getEnv = (key: string, fallback: string = ""): string => {
    return (process.env[key] || fallback).trim();
};

let wooApiInstance: any = null;

function getWooApi() {
    if (wooApiInstance) return wooApiInstance;

    const url = getEnv("NEXT_PUBLIC_WC_URL");
    const consumerKey = getEnv("WC_CONSUMER_KEY");
    const consumerSecret = getEnv("WC_CONSUMER_SECRET");

    if (!url || !consumerKey || !consumerSecret) {
        console.warn("WooCommerce API credentials missing or incomplete.");
    }

    wooApiInstance = new (WooCommerceRestApi as any)({
        url: url || "https://fallback.test",
        consumerKey: consumerKey || "fallback_key",
        consumerSecret: consumerSecret || "fallback_secret",
        version: "wc/v3",
        queryStringAuth: true
    });

    return wooApiInstance;
}

export async function fetchProducts(category = null) {
    try {
        const api = getWooApi();
        const params: Record<string, string | number> = { per_page: 100, status: 'publish' };
        if (category) params.category = category as string;

        console.log(`WOO DEBUG: Fetching products from ${getEnv("NEXT_PUBLIC_WC_URL")}...`);
        const response = await api.get("products", params);
        console.log(`WOO DEBUG: Success! Found ${response.data.length} products.`);
        return response.data;
    } catch (error: any) {
        console.error("WOO DEBUG: Error fetching products:");
        if (error.response) {
            console.error("- Status:", error.response.status);
            console.error("- Data:", JSON.stringify(error.response.data));
        } else {
            console.error("- Message:", error.message);
        }
        return [];
    }
}

export async function fetchCategories() {
    try {
        const api = getWooApi();
        const response = await api.get("products/categories", { per_page: 100 });
        return response.data;
    } catch (error: unknown) {
        console.error("Error fetching WooCommerce categories:", error instanceof Error ? error.message : error);
        return [];
    }
}

export async function fetchProductBySlug(slug: string) {
    try {
        const api = getWooApi();
        // Ensure slug is passed as a query parameter correctly
        const response = await api.get("products", {
            slug: slug,
            status: 'publish'
        });

        // Return only products that exactly match the slug as a double check
        const data = response.data;
        if (Array.isArray(data)) {
            return data.filter((p: any) => p.slug === slug);
        }
        return [];
    } catch (error: unknown) {
        console.error(`Error fetching WooCommerce product ${slug}:`, error instanceof Error ? error.message : error);
        return [];
    }
}
