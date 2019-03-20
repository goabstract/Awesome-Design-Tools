const http = require('http');
const path = require('path');
const fs = require('fs');

http.createServer((req, res) => {
	page(req, res, 'index');
}).listen(8001, '127.0.0.1');

function page(req, res, name) {
	fs.readFile(name + '.html', function (err, data) {
		res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
		res.write(data);
		res.end();
	});
}
