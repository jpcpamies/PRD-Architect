const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Servir archivos estáticos desde el directorio dist
app.use(express.static(path.join(__dirname, 'dist')));

// Manejar todas las rutas para SPAs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Static server running at http://0.0.0.0:${port}`);
});
