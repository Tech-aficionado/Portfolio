const fs = require('fs');
const path = require('path');
const TextToSVG = require('text-to-svg');

async function generateFromLocal() {
    try {
        const fontFilePath = path.resolve(__dirname, 'extracted_local', 'Carpenter Script Regular', 'Carpenter Script Regular.ttf');
        
        console.log(`Using perfect matched font: ${fontFilePath}`);

        // Initialize text-to-svg
        const textToSVG = TextToSVG.loadSync(fontFilePath);

        const attributes = { fill: 'white' };
        // Trying size 66 for robust script weight matching original signature
        const options = { x: 0, y: 0, fontSize: 62, anchor: 'top', attributes: attributes };
        
        let svg = textToSVG.getSVG('Shivansh', options);
        let pathDataStart = svg.indexOf('<path');
        let pathDataEnd = svg.indexOf('/>', pathDataStart) + 2;
        
        let extractedPath = svg.substring(pathDataStart, pathDataEnd);

        const metrics = textToSVG.getMetrics('Shivansh', options);
        console.log('Metrics:', metrics);
        
        const finalSvg = `<svg width="130" height="56" viewBox="0 0 ${metrics.width} ${metrics.height}" fill="none" xmlns="http://www.w3.org/2000/svg">\n${extractedPath}\n</svg>`;

        fs.writeFileSync('../public/logo/logo.svg', finalSvg);
        console.log('Saved perfect Carpenter SVG to ../public/logo/logo.svg');

    } catch (e) {
        console.error('Failed to generate SVG:', e);
    }
}

generateFromLocal();
