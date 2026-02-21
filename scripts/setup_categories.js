import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import dotenv from "dotenv";

// Simulamos carga de .env.local para obtener tokens reales
dotenv.config({ path: "./.env.local" });

const api = new WooCommerceRestApi.default({
    url: process.env.NEXT_PUBLIC_WC_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3"
});

// El gran árbol de taxonomía de Nook Specialty
const taxonomyTree = [
    {
        name: "Tés",
        description: "La más alta selección de la Camellia Sinensis",
        children: [
            { name: "Premium / Ceremonial" },
            { name: "Té Verde" },
            { name: "Té Negro" },
            { name: "Té Rojo (Pu-erh)" },
            { name: "Té Blanco" },
            { name: "Té Oolong" },
            { name: "Té Amarillo" },
            { name: "Por Propiedad", children: [{ name: "Relajante" }, { name: "Energizante" }, { name: "Digestivo" }, { name: "Antioxidante" }] },
            { name: "Por Origen", children: [{ name: "Japón" }, { name: "China" }, { name: "India" }, { name: "Sri Lanka" }] }
        ]
    },
    {
        name: "Infusiones",
        description: "Mezclas botánicas sin teína",
        children: [
            { name: "Frutales" },
            { name: "Herbales" },
            { name: "Rooibos" },
            { name: "Flores" }
        ]
    },
    {
        name: "Accesorios",
        description: "El equipo esencial para el ritual perfecto",
        children: [
            { name: "Teteras" },
            { name: "Tazas y Mugs" },
            { name: "Infusores y Filtros" },
            { name: "Medidores" }
        ]
    },
    {
        name: "Packs Nook",
        description: "Colecciones pensadas para regalar o degustar",
        children: [
            { name: "Regalos" },
            { name: "Degustación" },
            { name: "Rituales completos" }
        ]
    },
    {
        name: "Endulzantes Naturales",
        description: "El toque dulce que respeta el sabor original",
        children: [
            { name: "Mieles Artesanales" },
            { name: "Siropes Botánicos" },
            { name: "Azúcar de Caña Cruda" }
        ]
    }
];

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Función recursiva para crear categorías y anidar sus hijos asignando 'parent' ID.
async function createCategoryRecursive(catNodes, parentId = 0) {
    for (const node of catNodes) {
        const data = {
            name: node.name,
            parent: parentId,
            description: node.description || ""
        };

        try {
            console.log(`⏳ Creando: ${node.name} (Parent: ${parentId})`);
            const response = await api.post("products/categories", data);
            const newCatId = response.data.id;
            console.log(`✅ Creada: ${node.name} [ID: ${newCatId}]`);

            // 1 Segundo de cooldown para no saturar al servidor de Webempresa
            await delay(1000);

            // Si tiene hijos, se llama a sí misma pasándole el ID recién creado
            if (node.children && node.children.length > 0) {
                await createCategoryRecursive(node.children, newCatId);
            }
        } catch (error) {
            if (error.response && error.response.data.code === 'term_exists') {
                console.warn(`⚠️ Omitido cruzado: "${node.name}" ya existe. (${error.response.data.message})`);
                // Como ya existe, podríamos querer continuar sus hijos, pero en este script 
                // priorizamos la creación desde cero.
            } else {
                console.error(`❌ Error al crear "${node.name}":`, error.response?.data || error.message);
            }
        }
    }
}

async function run() {
    console.log("🌱 Iniciando inyección masiva de Categorías en WooCommerce...");
    await createCategoryRecursive(taxonomyTree, 0);
    console.log("🚀 ¡Proceso finalizado! Revisa tu WordPress.");
}

run();
