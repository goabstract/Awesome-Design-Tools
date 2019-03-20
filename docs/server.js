const http = require('http');
const path = require('path');
const fs = require('fs');

http.createServer((req, res) => {
	if (req.url.match(/\.(html|css|js|png|jpg|jpeg|woff|ttf|zip|gif|json|webp|svg)$/)) {
		public(req, res);
	}
	else if (req.url === '/') {
		page(req, res, 'index');
	} else {
		page(req, res, 'index');
	}

}).listen(8001, '127.0.0.1');

function page(req, res, name) {
	fs.readFile(name + '.html', function (err, data) {
		res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
		res.write(data);
		res.end();
	});
}

function public(req, res) {
	const extension = path.extname(req.url);
	let contentType = '';

	switch (extension) {
		case '.html':
			contentType = 'text/html';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.png':
			contentType = 'text/png';
			break;
		case '.gif':
			contentType = 'text/gif';
			break;
		case '.jpg':
			contentType = 'text/jpg';
			break;
		case '.zip':
			contentType = 'application/octet-stream';
			break;
		case '.webp':
			contentType = 'text/webp';
			break;
		case '.svg':
			contentType = 'image/svg+xml';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		default:
			contentType = 'text/plain';
	}

	const stream = fs.createReadStream(path.join(__dirname, req.url));
	res.statusCode = 200;
	res.setHeader('Content-Type', contentType);

	stream.pipe(res);
	stream.on('error', error => {
		if (error.code === 'ENOENT') {
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.end('Not found');
		}
		else {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.end(error.message);
		}
	});
}
