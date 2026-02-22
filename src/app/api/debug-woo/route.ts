import { fetchProducts, fetchCategories } from "@/lib/woo";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const urlRaw = process.env.NEXT_PUBLIC_WC_URL || "";
        const urlTrimmed = urlRaw.trim();

        const products = await fetchProducts();
        const categories = await fetchCategories();

        return NextResponse.json({
            status: "ok",
            inspection: {
                raw_url: urlRaw,
                raw_url_len: urlRaw.length,
                raw_url_hex: urlRaw.split('').map(c => c.charCodeAt(0).toString(16)).join(' '),
                trimmed_url: urlTrimmed,
                trimmed_url_len: urlTrimmed.length
            },
            counts: {
                products: products?.length || 0,
                categories: categories?.length || 0
            },
            samples: {
                products: products?.slice(0, 5).map((p: any) => p.name) || []
            }
        });
    } catch (error: any) {
        return NextResponse.json({
            status: "error",
            message: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
