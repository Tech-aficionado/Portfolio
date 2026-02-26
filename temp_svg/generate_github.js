const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const TextToSVG = require('text-to-svg');

async function findAndGenerate() {
    console.log('Launching puppeteer to search GitHub...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    await page.goto('https://github.com/search?q=Carpenter.ttf&type=code', { waitUntil: 'networkidle2' });
    
    // Extract search results
    const links = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a'));
        return anchors.map(a => a.href).filter(href => href.endsWith('Carpenter.ttf') && href.includes('/blob/'));
    });
    
    await browser.close();
    
    if (links.length === 0) {
        console.error('No GitHub links found for Carpenter.ttf');
        return;
    }
    
    const rawUrl = links[0].replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    console.log(`Found raw URL: ${rawUrl}`);
    
    console.log('Downloading font...');
    const fontResponse = await axios.get(rawUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync('Carpenter.ttf', fontResponse.data);
    
    console.log(`Generating SVG...`);
    const textToSVG = TextToSVG.loadSync('Carpenter.ttf');
    const options = { x: 0, y: 0, fontSize: 62, anchor: 'top', attributes: { fill: 'white' } };
    
    let svg = textToSVG.getSVG('Shivansh', options);
    let pathDataStart = svg.indexOf('<path');
    let pathDataEnd = svg.indexOf('/>', pathDataStart) + 2;
    let extractedPath = svg.substring(pathDataStart, pathDataEnd);

    const metrics = textToSVG.getMetrics('Shivansh', options);
    const finalSvg = `<svg width="130" height="56" viewBox="0 0 ${metrics.width} ${metrics.height}" fill="none" xmlns="http://www.w3.org/2000/svg">\n${extractedPath}\n</svg>`;

    fs.writeFileSync('../public/logo/logo.svg', finalSvg);
    console.log('Saved perfect Carpenter SVG to ../public/logo/logo.svg');
}

findAndGenerate().catch(console.error);
