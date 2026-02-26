const TextToSVG = require('text-to-svg');
const axios = require('axios');
const fs = require('fs');
const AdmZip = require('adm-zip');

async function generateSignature() {
    try {
        console.log('Downloading Carpenter font zip with proper headers...');
        
        // Let's try to get "Carpenter 4" which is likely the free DaFont version
        const fontUrl = 'https://dl.dafont.com/dl/?f=carpenter_4'; 
        
        const response = await axios.get(fontUrl, { 
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://www.dafont.com/carpenter-4.font'
            }
        });

        // Let's check if it actually downloaded a zip (a zip file starts with 'PK\x03\x04')
        const buffer = Buffer.from(response.data);
        if (buffer.length < 4 || buffer.toString('utf8', 0, 4) !== 'PK\x03\x04') {
            throw new Error('Downloaded file is not a valid ZIP file. It might be blocked.');
        }

        fs.writeFileSync('font.zip', buffer);
        console.log('Downloaded valid zip successfully.');

        const zip = new AdmZip('font.zip');
        zip.extractAllTo('./extracted', true);
        
        // Find TTF or OTF files
        const files = fs.readdirSync('./extracted');
        const fontFile = files.find(f => f.toLowerCase().endsWith('.ttf') || f.toLowerCase().endsWith('.otf'));
        
        if (!fontFile) {
            throw new Error('No font file found in the downloaded ZIP: ' + files.join(', '));
        }
        
        console.log(`Using font: ${fontFile}`);

        // Initialize text-to-svg
        const textToSVG = TextToSVG.loadSync(`./extracted/${fontFile}`);

        const attributes = { fill: 'white' };
        const options = { x: 0, y: 0, fontSize: 62, anchor: 'top', attributes: attributes };
        
        let svg = textToSVG.getSVG('Shivansh', options);
        let pathDataStart = svg.indexOf('<path');
        let pathDataEnd = svg.indexOf('/>', pathDataStart) + 2;
        
        let extractedPath = svg.substring(pathDataStart, pathDataEnd);

        const metrics = textToSVG.getMetrics('Shivansh', options);
        console.log('Metrics:', metrics);
        
        const finalSvg = `<svg width="130" height="56" viewBox="0 0 ${metrics.width} ${metrics.height}" fill="none" xmlns="http://www.w3.org/2000/svg">\n${extractedPath}\n</svg>`;

        fs.writeFileSync('../public/logo/logo.svg', finalSvg);
        console.log('Saved generated SVG to ../public/logo/logo.svg');

    } catch (e) {
        console.error('Failed to generate SVG:', e.message);
    }
}

generateSignature();
