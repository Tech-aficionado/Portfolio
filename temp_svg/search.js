const axios = require('axios');
const fs = require('fs');

async function searchGithub() {
    try {
        console.log('Searching GitHub for Carpenter.ttf or Carpenter.otf...');
        const response = await axios.get('https://api.github.com/search/code?q=filename:Carpenter.ttf+OR+filename:Carpenter.otf', {
            headers: {
                'User-Agent': 'NodeJS-Axios-Script'
            }
        });
        
        console.log(`Found ${response.data.total_count} results.`);
        for (let item of response.data.items.slice(0, 5)) {
            const rawUrl = item.html_url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
            console.log(`Raw URL: ${rawUrl}`);
        }
    } catch (e) {
        console.error('Failed to search github:', e.message);
    }
}

searchGithub();
