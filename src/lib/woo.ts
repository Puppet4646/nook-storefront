import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Helper to get sanitized env variables
const getEnv = (key: string, fallback: string = ""): string => {
    return (process.env[key] || fallback).trim();
};

interface WooApi {
    get(endpoint: string, params?: Record<string, unknown>): Promise<{ data: unknown[] | Record<string, unknown> }>;
    put(endpoint: string, params?: Record<string, unknown>): Promise<{ data: unknown }>;
    post(endpoint: string, params?: Record<string, unknown>): Promise<{ data: unknown }>;
    delete(endpoint: string, params?: Record<string, unknown>): Promise<{ data: unknown }>;
}

let wooApiInstance: WooApi | null = null;

export interface WooCategory {
    id: number;
    name: string;
    slug: string;
    count: number;
    parent: number;
}

export interface WooProduct {
    id: number;
    name: string;
    price: string;
    price_html: string;
    short_description: string;
    description: string;
    date_created?: string;
    images: { id: number; src: string; alt: string }[];
    permalink: string;
    slug: string;
    categories?: { id: number; name: string; slug: string }[];
    attributes?: { id: number; name: string; options?: string[] }[];
}

function getWooApi(): WooApi {
    if (wooApiInstance) return wooApiInstance;

    const url = getEnv("NEXT_PUBLIC_WC_URL");
    const consumerKey = getEnv("WC_CONSUMER_KEY");
    const consumerSecret = getEnv("WC_CONSUMER_SECRET");

    if (!url || !consumerKey || !consumerSecret) {
        console.warn("WooCommerce API credentials missing or incomplete.");
    }

    wooApiInstance = new (WooCommerceRestApi as unknown as new (args: unknown) => WooApi)({
        url: url || "https://fallback.test",
        consumerKey: consumerKey || "fallback_key",
        consumerSecret: consumerSecret || "fallback_secret",
        version: "wc/v3",
        queryStringAuth: true
    });

    return wooApiInstance as WooApi;
}

export async function fetchProducts(category: string | number | null = null): Promise<WooProduct[]> {
    try {
        const api = getWooApi();
        const params: Record<string, string | number> = { per_page: 100, status: 'publish' };
        if (category) params.category = category as string;

        console.log(`WOO DEBUG: Fetching products from ${getEnv("NEXT_PUBLIC_WC_URL")}...`);
        const response = await api.get("products", params);
        const data = Array.isArray(response.data) ? response.data : [];
        console.log(`WOO DEBUG: Success! Found ${data.length} products.`);
        return data as WooProduct[];
    } catch (error: unknown) {
        console.error("WOO DEBUG: Error fetching products:");
        if (error instanceof Error && 'response' in error) {
            const errList = error as unknown as { response: { status: number, data: unknown }};
            console.error("- Status:", errList.response.status);
            console.error("- Data:", JSON.stringify(errList.response.data));
        } else if (error instanceof Error) {
            console.error("- Message:", error.message);
        }
        return [];
    }
}

export async function fetchCategories(): Promise<WooCategory[]> {
    try {
        const api = getWooApi();
        const response = await api.get("products/categories", { per_page: 100 });
        return response.data as WooCategory[];
    } catch (error: unknown) {
        console.error("Error fetching WooCommerce categories:", error instanceof Error ? error.message : error);
        return [];
    }
}

export async function fetchProductBySlug(slug: string): Promise<WooProduct[]> {
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
            return (data as WooProduct[]).filter((p) => p.slug === slug);
        }
        return [];
    } catch (error: unknown) {
        console.error(`Error fetching WooCommerce product ${slug}:`, error instanceof Error ? error.message : error);
        return [];
    }
}
