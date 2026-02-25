import { fetchProductBySlug } from './src/lib/woo';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function test() {
    const slugs = ['te-organico-pu-erh-crudo', 'yunnan-2003-mature-pu-erh'];
    for (const slug of slugs) {
        console.log(`Testing slug: ${slug}`);
        const products = await fetchProductBySlug(slug);
        if (products && products.length > 0) {
            console.log(`Found: ${products[0].name} (ID: ${products[0].id})`);
        } else {
            console.log(`No product found for slug: ${slug}`);
        }
    }
}

test();
