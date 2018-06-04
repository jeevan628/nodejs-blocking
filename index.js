const express = require('express');

const sleep = function sleep(seconds) {
	return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

const app = express();

app.get('/fast', (req, res) => res.send('Hey Im fast'));
app.get('/noop', (req, res) => {});

app.get('/slow', async (req, res) => {
	await sleep(11);
	res.send('Im kinda slow');
});


app.get('/block', (req, res) => {

	let obj = {};
	for (let i = 0; i < 10000; i += 1) {
		obj[`${i}`] = i;
		JSON.parse(JSON.stringify(obj));
	}
  res.send('Im expensive');
});
app.listen(3000, () => console.log('Listening on 3000 yo'));

