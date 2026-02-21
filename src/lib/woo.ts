import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Ensure we are not exposing tokens on the client side
if (typeof window !== 'undefined') {
    throw new Error("WooCommerce API should only be called on the server side.");
}

let wooApi: any;
try {
    wooApi = new (WooCommerceRestApi as any)({
        url: process.env.NEXT_PUBLIC_WC_URL || 'https://fallback.test',
        consumerKey: process.env.WC_CONSUMER_KEY || 'fallback_key',
        consumerSecret: process.env.WC_CONSUMER_SECRET || 'fallback_secret',
        version: "wc/v3",
        queryStringAuth: true // Important for many generic hostings
    });
} catch (e) {
    console.warn("WooCommerce API keys missing. Fallback initialized for build context.");
}
export { wooApi };

export async function fetchProducts(category = null) {
    try {
        const params: Record<string, string | number> = { per_page: 20, status: 'publish' };
        if (category) params.category = category as string;

        const response = await wooApi.get("products", params);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching WooCommerce products:", (error as Error).message);
        } else {
            console.error("Error fetching WooCommerce products:", error);
        }
        return [];
    }
}

export async function fetchCategories() {
    try {
        const response = await wooApi.get("products/categories", { per_page: 100 });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching WooCommerce categories:", error.message);
        }
        return [];
    }
}

export async function fetchProductBySlug(slug: string) {
    try {
        const response = await wooApi.get("products", { slug });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error fetching WooCommerce product ${slug}:`, error.message);
        }
        return [];
    }
}
