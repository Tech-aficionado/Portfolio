const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');
const TextToSVG = require('text-to-svg');

async function downloadAndGenerate() {
    const downloadPath = path.resolve(__dirname, 'downloads');
    if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath);
    }

    console.log('Launching puppeteer...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set download path
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath
    });

    console.log('Navigating to dafont download link directly...');
    // We already know the file, we can just navigate to the DL link.
    // It might hang the navigation since it's a download, so we don't await networkidle2
    page.goto('https://dl.dafont.com/dl/?f=carpenter_4').catch(() => {});
    
    console.log('Waiting for download to complete...');
    // Poll the download directory until a .zip file is fully written (no .crdownload)
    let downloadedFiles = [];
    let retries = 0;
    while (retries < 30) {
        await new Promise(r => setTimeout(r, 1000));
        downloadedFiles = fs.readdirSync(downloadPath);
        if (downloadedFiles.some(f => f.endsWith('.zip')) && !downloadedFiles.some(f => f.endsWith('.crdownload'))) {
            break;
        }
        retries++;
    }
    
    await browser.close();
    
    const zipFile = downloadedFiles.find(f => f.endsWith('.zip'));
    if (!zipFile) {
        console.error('Download failed or timed out.');
        return;
    }
    
    console.log('Downloaded zip: ' + zipFile);
    const zip = new AdmZip(path.join(downloadPath, zipFile));
    zip.extractAllTo(downloadPath, true);
    
    const extractedFiles = fs.readdirSync(downloadPath);
    const fontFile = extractedFiles.find(f => f.toLowerCase().endsWith('.ttf') || f.toLowerCase().endsWith('.otf'));
    if (!fontFile) {
        console.error('No font file found in the zip.');
        return;
    }
    
    console.log(`Generating SVG using font: ${fontFile}`);
    const textToSVG = TextToSVG.loadSync(path.join(downloadPath, fontFile));
    const attributes = { fill: 'white' };
    const options = { x: 0, y: 0, fontSize: 62, anchor: 'top', attributes: attributes };
    
    let svg = textToSVG.getSVG('Shivansh', options);
    let pathDataStart = svg.indexOf('<path');
    let pathDataEnd = svg.indexOf('/>', pathDataStart) + 2;
    let extractedPath = svg.substring(pathDataStart, pathDataEnd);

    const metrics = textToSVG.getMetrics('Shivansh', options);
    const finalSvg = `<svg width="130" height="56" viewBox="0 0 ${metrics.width} ${metrics.height}" fill="none" xmlns="http://www.w3.org/2000/svg">\n${extractedPath}\n</svg>`;

    fs.writeFileSync('../public/logo/logo.svg', finalSvg);
    console.log('Saved perfect Carpenter SVG to ../public/logo/logo.svg');
}

downloadAndGenerate().catch(console.error);
