const axios = require('axios');
const fs = require('fs');
const path = require('path');
const TextToSVG = require('text-to-svg');

async function downloadAndGenerate() {
    try {
        console.log('Downloading Carpenter TTF directly from FontsForYou...');
        
        const fontUrl = 'https://fontsforyou.com/download/61218-carpenter.ttf'; 
        
        const response = await axios.get(fontUrl, { 
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://fontsforyou.com/font/61218-carpenter'
            }
        });

        // Let's check if it actually downloaded a ttf
        const buffer = Buffer.from(response.data);
        if (buffer.length < 100) {
            throw new Error('Downloaded file is too small. It might be blocked.');
        }

        fs.writeFileSync('Carpenter.ttf', buffer);
        console.log('Downloaded valid TTF successfully.');
        
        console.log(`Generating SVG...`);
        const textToSVG = TextToSVG.loadSync('Carpenter.ttf');
        const attributes = { fill: 'white' };
        // Trying size 66 for robust script weight
        const options = { x: 0, y: 0, fontSize: 66, anchor: 'top', attributes: attributes };
        
        let svg = textToSVG.getSVG('Shivansh', options);
        let pathDataStart = svg.indexOf('<path');
        let pathDataEnd = svg.indexOf('/>', pathDataStart) + 2;
        let extractedPath = svg.substring(pathDataStart, pathDataEnd);

        const metrics = textToSVG.getMetrics('Shivansh', options);
        // Adjust viewbox to be a bit tighter
        const finalSvg = `<svg width="130" height="56" viewBox="0 0 ${metrics.width} ${metrics.height}" fill="none" xmlns="http://www.w3.org/2000/svg">\n${extractedPath}\n</svg>`;

        fs.writeFileSync('../public/logo/logo.svg', finalSvg);
        console.log('Saved perfect Carpenter SVG to ../public/logo/logo.svg');

    } catch (e) {
        console.error('Failed to generate SVG:', e.message);
    }
}

downloadAndGenerate();
