const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.readFile(path.join(__dirname, 'login.html'), (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error loading login.html');
            } else {
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            // Here you can add authentication logic if needed
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.readFile(path.join(__dirname, 'dashboard.html'), (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Error loading dashboard.html');
                } else {
                    res.end(data);
                }
            });
        });
    } else if (req.method === 'GET' && req.url === '/logout') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.readFile(path.join(__dirname, 'login.html'), (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error loading login.html');
            } else {
                res.end(data);
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});