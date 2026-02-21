import fs from 'fs';
import https from 'https';

const url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzZiMDRmNjBiOTJlZjQxOWY5MjkzMWI2ODFjZGY4N2I2EgsSBxDwza2lnAgYAZIBIwoKcHJvamVjdF9pZBIVQhM1Nzc3ODE2NDMwMzI2NTM1ODA0&filename=&opi=96797242";

https.get(url, (res) => {
    let data = '';

    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
            let redirectData = '';
            redirectRes.on('data', chunk => redirectData += chunk);
            redirectRes.on('end', () => {
                fs.writeFileSync('stitch_pdp.html', redirectData);
                console.log("Saved redirected HTML successfully!");
            });
        });
        return;
    }

    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        fs.writeFileSync('stitch_pdp.html', data);
        console.log("Saved HTML successfully!");
    });
});
