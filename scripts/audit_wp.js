require('dotenv').config({ path: '.env.local' });
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const WC_URL = process.env.NEXT_PUBLIC_WC_URL?.trim();
const WC_KEY = process.env.WC_CONSUMER_KEY?.trim();
const WC_SECRET = process.env.WC_CONSUMER_SECRET?.trim();

const api = new WooCommerceRestApi({
    url: WC_URL,
    consumerKey: WC_KEY,
    consumerSecret: WC_SECRET,
    version: "wc/v3",
    queryStringAuth: true
});

async function audit() {
    console.log("=== NOOK SPECIALTY: WORDPRESS + WOOCOMMERCE AUDIT ===\n");

    // 1. System status
    try {
        const sys = await api.get("system_status");
        const d = sys.data;
        const env = d.environment || {};
        const db = d.database || {};
        const theme = d.theme || {};
        const settings = d.settings || {};
        const sec = d.security || {};

        console.log("--- ENVIRONMENT ---");
        console.log(`WP Version: ${env.wp_version}`);
        console.log(`WC Version: ${env.version}`);
        console.log(`PHP Version: ${env.php_version}`);
        console.log(`MySQL Version: ${db.wc_database_version}`);
        console.log(`Server: ${env.server_info}`);
        console.log(`Memory Limit: ${env.php_memory_limit}`);
        console.log(`Max Upload: ${env.php_max_upload_size}`);
        console.log(`SSL: ${env.external_object_cache}`);
        console.log(`Debug Mode: ${env.wp_debug_mode}`);
        console.log(`HTTPS: ${sec.secure_connection}`);

        console.log("\n--- ACTIVE THEME ---");
        console.log(`Name: ${theme.name}`);
        console.log(`Version: ${theme.version}`);
        console.log(`Author: ${theme.author_url}`);
        console.log(`Child Theme: ${theme.is_child_theme}`);
        console.log(`WC Support: ${theme.has_woocommerce_support}`);

        console.log("\n--- ACTIVE PLUGINS ---");
        const plugins = d.active_plugins || [];
        plugins.forEach((p, i) => {
            console.log(`${i + 1}. ${p.name} v${p.version} (by ${p.author_name})`);
            console.log(`   URL: ${p.plugin}`);
        });

        console.log("\n--- INACTIVE PLUGINS ---");
        const inactive = d.inactive_plugins || [];
        if (inactive.length === 0) {
            console.log("(none)");
        } else {
            inactive.forEach((p, i) => {
                console.log(`${i + 1}. ${p.name} v${p.version}`);
            });
        }

        console.log("\n--- WC SETTINGS ---");
        console.log(`Currency: ${settings.currency}`);
        console.log(`Currency Position: ${settings.currency_position}`);
        console.log(`Thousands Sep: '${settings.thousand_separator}'`);
        console.log(`Decimal Sep: '${settings.decimal_separator}'`);
        console.log(`Num Decimals: ${settings.number_of_decimals}`);
        console.log(`Taxes Enabled: ${settings.calc_taxes}`);

        console.log("\n--- WC PAGES ---");
        const pages = d.pages || {};
        console.log(`Shop: ${pages.myaccount_page_set ? "SET" : "NOT SET"}`);

    } catch (e) {
        console.error("System status error:", e.message);
    }

    // 2. Products summary
    try {
        const prods = await api.get("products", { per_page: 100, status: "publish" });
        console.log(`\n--- PRODUCTS (${prods.data.length} published) ---`);
        prods.data.forEach((p, i) => {
            const imgs = p.images?.length || 0;
            const attrs = p.attributes?.length || 0;
            const cats = p.categories?.map(c => c.name).join(", ") || "none";
            console.log(`${i + 1}. [${p.slug}] ${p.name} | €${p.price} | ${imgs} imgs | ${attrs} attrs | cats: ${cats}`);
        });

        // Check for draft products
        const drafts = await api.get("products", { per_page: 100, status: "draft" });
        if (drafts.data.length > 0) {
            console.log(`\n--- DRAFT PRODUCTS (${drafts.data.length}) ---`);
            drafts.data.forEach((p, i) => {
                console.log(`${i + 1}. [${p.slug}] ${p.name}`);
            });
        }
    } catch (e) {
        console.error("Products error:", e.message);
    }

    // 3. Payment gateways
    try {
        const gw = await api.get("payment_gateways");
        console.log("\n--- PAYMENT GATEWAYS ---");
        gw.data.forEach(g => {
            console.log(`${g.id}: ${g.title} [${g.enabled ? "ENABLED" : "disabled"}] - ${g.description || "(no description)"}`);
        });
    } catch (e) {
        console.error("Payment gateways error:", e.message);
    }

    // 4. Shipping zones
    try {
        const zones = await api.get("shipping/zones");
        console.log("\n--- SHIPPING ZONES ---");
        for (const zone of zones.data) {
            console.log(`Zone: ${zone.name} (ID: ${zone.id})`);
            try {
                const methods = await api.get(`shipping/zones/${zone.id}/methods`);
                methods.data.forEach(m => {
                    console.log(`  - ${m.title} (${m.method_id}) [${m.enabled ? "ENABLED" : "disabled"}]`);
                });
            } catch (e) { }
        }
    } catch (e) {
        console.error("Shipping error:", e.message);
    }

    // 5. Tax settings
    try {
        const tax = await api.get("taxes");
        console.log("\n--- TAX RATES ---");
        if (tax.data.length === 0) {
            console.log("(no tax rates configured)");
        } else {
            tax.data.forEach(t => {
                console.log(`${t.country} ${t.state}: ${t.rate}% (${t.name}) [${t.class || "standard"}]`);
            });
        }
    } catch (e) {
        console.error("Tax error:", e.message);
    }

    // 6. Categories
    try {
        const cats = await api.get("products/categories", { per_page: 100 });
        console.log("\n--- PRODUCT CATEGORIES ---");
        cats.data.forEach(c => {
            console.log(`${c.id}: ${c.name} (${c.count} products) | slug: ${c.slug}`);
        });
    } catch (e) {
        console.error("Categories error:", e.message);
    }

    console.log("\n=== AUDIT COMPLETE ===");
}

audit();
