const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const distPath = path.join(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(distPath, req.url === '/' ? 'index.html' : req.url);
  
  // Si el archivo no existe, servir index.html (para SPA routing)
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distPath, 'index.html');
  }

  const extname = path.extname(filePath);
  const mimeType = mimeTypes[extname] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Simple server running at http://0.0.0.0:${port}`);
});
