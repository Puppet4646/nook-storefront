const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const dotenv = require("dotenv");
const path = require("path");

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
        id: 29313, // Té orgánico Pu-erh crudo
        attributes: [
            { name: "Intensidad", options: ["5/10"] },
            { name: "Temperatura", options: ["85ºC"] },
            { name: "Tiempo", options: ["2 min"] },
            { name: "Notas de Cata", options: ["Vegetal, fresco, floral"] }
        ],
        description: "Recogido en las montañas de Yunnan durante la primavera, este Pu-erh crudo ofrece una claridad excepcional. A diferencia de las versiones maduras, conserva el carácter vibrante de la hoja verde, evolucionando hacia notas florales y una dulzura mineral persistente."
    },
    {
        id: 29315, // Yunnan 2003 Mature Pu-erh
        attributes: [
            { name: "Intensidad", options: ["9/10"] },
            { name: "Temperatura", options: ["95ºC"] },
            { name: "Tiempo", options: ["3 min"] },
            { name: "Notas de Cata", options: ["Chocolate, nueces, fruta madura"] }
        ],
        description: "Este Yunnan 2003 Mature Pu-erh es una joya del tiempo. El proceso de post-fermentación ha suavizado cualquier astringencia, revelando un cuerpo denso y aterciopelado. Su complejidad evoca el aroma de un bosque antiguo tras la lluvia, con sutiles toques de cacao y frutas pasificadas."
    }
];

async function updateProducts() {
    for (const u of updates) {
        try {
            await api.put(`products/${u.id}`, {
                attributes: u.attributes.map(a => ({ ...a, visible: true })),
                description: u.description
            });
            console.log(`✅ Updated product ${u.id} with attributes and description.`);
        } catch (e) {
            console.error(`❌ Error updating ${u.id}:`, e.response ? e.response.data : e.message);
        }
    }
}

updateProducts();
