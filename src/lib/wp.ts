// lib/wp.ts
// Utilidad para extraer posts del blog usando la API REST de WordPress (no WooCommerce).

const WP_URL = process.env.NEXT_PUBLIC_WC_URL; // Reutilizamos URL base, ej: https://nookspecialty.es

export async function fetchPosts() {
    try {
        // Obtenemos los últimos 10 posts publicados junto con el autor e imagen destacada usando _embed
        const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?_embed&per_page=10&status=publish`);
        if (!res.ok) {
            throw new Error('Error fetcheando posts de WP');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("fetchPosts Error:", error);
        return [];
    }
}

export async function fetchPostBySlug(slug: string) {
    try {
        const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`);
        if (!res.ok) {
            throw new Error('Error fetcheando post individual de WP');
        }
        const data = await res.json();
        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error("fetchPostBySlug Error:", error);
        return null;
    }
}
