require('dotenv').config({ path: '.env.local' });
const axios = require('axios');
const fs = require('fs');

const WP_URL = process.env.NEXT_PUBLIC_WC_URL?.trim();
const auth = Buffer.from(
    process.env.WP_API_USER.trim() + ':' + process.env.WP_API_APP_PASS.trim()
).toString('base64');
const headers = { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' };

const NAMES_TO_REMOVE = [
    'Woodmart Core',
    'Woodmart AI Bridge',
    'Elementor',
    'AI Content Generator For Elementor',
    'Angie',
    'Jetpack',
    'Klaviyo',
    'MC4WP: Mailchimp for WordPress',
    'Reddit for WooCommerce',
    'Snapchat for WooCommerce',
    'Ally - Web Accessibility',  // partial match for the inactive one
    'Contact Form 7',
    'WP Super Cache',
];

async function run() {
    // Get all plugins with their self links
    const res = await axios.get(`${WP_URL}/wp-json/wp/v2/plugins`, { headers });
    const allPlugins = res.data;

    const toRemove = allPlugins.filter(p =>
        NAMES_TO_REMOVE.some(name => p.name.includes(name))
    );

    const results = [];

    for (const plugin of toRemove) {
        const selfUrl = plugin._links?.self?.[0]?.href;
        if (!selfUrl) {
            results.push({ name: plugin.name, status: 'no self link' });
            continue;
        }

        // Step 1: Deactivate
        try {
            await axios.put(selfUrl, { status: 'inactive' }, { headers });
            results.push({ name: plugin.name, step: 'deactivate', status: 'ok' });
        } catch (e) {
            results.push({ name: plugin.name, step: 'deactivate', status: e.response?.data?.message || e.message });
        }

        // Step 2: Delete
        try {
            await axios.delete(selfUrl, { headers });
            results.push({ name: plugin.name, step: 'delete', status: 'ok' });
        } catch (e) {
            results.push({ name: plugin.name, step: 'delete', status: e.response?.data?.message || e.message });
        }
    }

    // Verify remaining
    const after = await axios.get(`${WP_URL}/wp-json/wp/v2/plugins`, { headers });
    const active = after.data.filter(p => p.status === 'active').map(p => p.name);
    const inactive = after.data.filter(p => p.status !== 'active').map(p => p.name);

    fs.writeFileSync('scripts/cleanup_final.json', JSON.stringify({
        actions: results,
        remaining: { active, inactive, totalActive: active.length }
    }, null, 2), 'utf8');

    console.log('DONE - saved to scripts/cleanup_final.json');
}

run().catch(e => console.error('FATAL:', e.message));
