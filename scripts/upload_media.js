import fs from 'fs';
import path from 'path';
import https from 'https';

const username = 'Naturculture';
const password = 'I2I9 o2Z8 pE5L 8hhv NPV8 fjt7';
const auth = Buffer.from(username + ':' + password).toString('base64');

const logFile = 'upload_log.json';
const logData = [];

async function uploadImage(filePath) {
    const fileName = path.basename(filePath);
    const fileContent = fs.readFileSync(filePath);

    const options = {
        hostname: 'nookspecialty.es',
        port: 443,
        path: '/wp-json/wp/v2/media',
        method: 'POST',
        headers: {
            'Content-Type': 'image/webp',
            'Content-Disposition': `attachment; filename="${fileName}"`,
            'Authorization': 'Basic ' + auth
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    resolve(json);
                } catch {
                    reject(new Error(body));
                }
            });
        });
        req.on('error', reject);
        req.write(fileContent);
        req.end();
    });
}

const imagesToUpload = [
    { pId: 29313, path: 'C:/Users/Maste/Desktop/NOOK/Té organico Pu-erh crudo/s-l960.webp' },
    { pId: 29313, path: 'C:/Users/Maste/Desktop/NOOK/Té organico Pu-erh crudo/s-l960 (1).webp' },
    { pId: 29313, path: 'C:/Users/Maste/Desktop/NOOK/Té organico Pu-erh crudo/s-l960 (2).webp' },
    { pId: 29315, path: 'C:/Users/Maste/Desktop/NOOK/Yunnan 2003 Madure Pu-erh Mini/s-l1600.webp' },
    { pId: 29315, path: 'C:/Users/Maste/Desktop/NOOK/Yunnan 2003 Madure Pu-erh Mini/s-l1600 (1).webp' },
    { pId: 29315, path: 'C:/Users/Maste/Desktop/NOOK/Yunnan 2003 Madure Pu-erh Mini/s-l1600 (2).webp' },
    { pId: 29315, path: 'C:/Users/Maste/Desktop/NOOK/Yunnan 2003 Madure Pu-erh Mini/s-l1600 (3).webp' }
];

async function run() {
    for (const item of imagesToUpload) {
        try {
            const res = await uploadImage(item.path);
            logData.push({ pId: item.pId, mediaId: res.id, url: res.source_url });
        } catch (e) {
            console.error(e);
        }
    }
    fs.writeFileSync(logFile, JSON.stringify(logData, null, 2));
    console.log('DONE');
}

run();
