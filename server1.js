const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8081;

app.get('/api/mensaje', (req, res) => {
  res.status(200).json('Mensaje correcto');
});

app.get('/api/usuario', (req, resp) => {
  const { nombre, apellido } = req.query;
  console.log(nombre, apellido);
  resp.status(200).json({ mensaje: 'mensaje get query', nombre, apellido });
});

app.get('/api/usuario/dni/:dni/:cuil', (req, resp) => {
  const { dni, cuil } = req.params;
  console.log(dni);
  resp.status(200).json({ mensaje: 'pedidio por params', dni, cuil });
});

const server = app.listen(PORT, () => {
  console.log(`server is runing at http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.log(err);
});
