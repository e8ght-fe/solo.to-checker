const axios = require('axios');
const fs = require('fs');

const nameList = fs.readFileSync(`${__dirname}/names.txt`).toString().split(' ');

async function check(username) {
		headers = {
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
			'Accept-Encoding': 'gzip, deflate, br',
			'Accept-Language': 'en-US,en;q=0.5',
			'Connection': 'keep-alive',
			'Host': 'solo.to',
			'Sec-Fetch-Dest': 'document',
			'Sec-Fetch-Mode': 'navigate',
			'Sec-Fetch-Site': 'none',
			'Sec-Fetch-User': '?1',
			'TE': 'trailers',
			'Upgrade-Insecure-Requests': '1',
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0'
		}

		await axios(`https://solo.to/${username}`, {
			method: 'get',
			headers: headers,
			timeout: 100000
		}).then(response => {
			if(response.status == 200) {
				console.log('taken name');
			} else {
				console.log(response.status)
			}
		}).catch(function(err) {
			if (err.response.status == 404) {
				return console.log('untaken name')
			}
			console.log('error | ' + err.message + err.response.status);
		});
}

const main = async _ => {
	for(let i = 0; i < nameList.length; i++) {
		await check(nameList[i]);
	}
}

main();