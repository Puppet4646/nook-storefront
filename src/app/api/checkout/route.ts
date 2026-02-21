import { NextResponse } from 'next/server';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Initialize the API securely on the server side
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wooApi = new (WooCommerceRestApi as any)({
    url: process.env.NEXT_PUBLIC_WC_URL || 'https://fallback.test',
    consumerKey: process.env.WC_CONSUMER_KEY || 'fallback_key',
    consumerSecret: process.env.WC_CONSUMER_SECRET || 'fallback_secret',
    version: "wc/v3",
    queryStringAuth: true
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Destructure payload from frontend
        const { contact, shipping, items } = body;

        // Map frontend cart items to WooCommerce line_items format
        const line_items = items.map((item: { id: number, quantity: number }) => ({
            product_id: item.id,
            quantity: item.quantity
        }));

        // Construct the expected WooCommerce Order payload
        const orderData = {
            payment_method: "bacs", // Using Direct Bank Transfer as default for testing/prototype
            payment_method_title: "Transferencia Bancaria Directa",
            set_paid: false,
            billing: {
                first_name: shipping.firstName,
                last_name: shipping.lastName,
                address_1: shipping.address,
                city: shipping.city,
                postcode: shipping.postalCode,
                country: "ES", // Defaulting to Spain for prototype
                email: contact.email,
                phone: "" // Optional in our current form
            },
            shipping: {
                first_name: shipping.firstName,
                last_name: shipping.lastName,
                address_1: shipping.address,
                city: shipping.city,
                postcode: shipping.postalCode,
                country: "ES"
            },
            line_items: line_items
        };

        // Send the payload to WooCommerce
        const response = await wooApi.post("orders", orderData);

        // Return successful order ID to frontend
        return NextResponse.json({ success: true, orderId: response.data.id }, { status: 201 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("WooCommerce API Order Creation Error:", error.message);
        } else {
            console.error("WooCommerce API Order Creation Error:", error);
        }
        return NextResponse.json(
            { success: false, message: "Error al procesar el pedido. Por favor, inténtelo de nuevo." },
            { status: 500 }
        );
    }
}
