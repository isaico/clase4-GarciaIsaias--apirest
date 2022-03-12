const express = require('express');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                 AUXILIARES                                 */
/* -------------------------------------------------------------------------- */
function notFoundProd(arr, id) {
  let flag = true;
  const found = arr.find((elem) => elem.id == id);
  if (found) {
    return flag;
  } else {
    return (flag = false);
  }
}
const productos = [];
/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */
router.get('/', (req, res) => {
  res.status(200).sendFile('public/formulario.html', { root: __dirname });
});

router.get('/', (req, res) => {
  res.status(200).json({ productos });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (notFoundProd(productos, id)) {
    res.status(200).json(productos[id]);
  } else {
    res.status(400).json({ error: 'producto no encontrado' });
  }
});

app.use('/api/productos', router);

/* -------------------------------------------------------------------------- */
/*                                    POST                                    */
/* -------------------------------------------------------------------------- */

app.post('/api/productos', (req, res) => {
  const { body } = req;
  body.id = productos.length;
  productos.push(body);
  res.status(200).json(`producto agregado`);
});
/* -------------------------------------------------------------------------- */
/*                                   DELETE                                   */
/* -------------------------------------------------------------------------- */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (notFoundProd(productos, id)) {
    productos.splice(id, 1);
    res
      .status(200)
      .json(`arreglo: ${{ productos }}, se elimino el producto con id: ${id}`);
  } else {
    res.status(400).json({ error: 'producto no encontrado' });
  }
});
/* -------------------------------------------------------------------------- */
/*                                     PUT                                    */
/* -------------------------------------------------------------------------- */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  if (notFoundProd(productos, id)) {
    const prodModif = productos[id];
    const { body } = req.body;
    Object.assign(prodModif, body); //este metodo sobreescribe los valores que tengan las mismas keys
    res.status(200).json({});
  } else {
    res.status(400).json({ error: 'producto no encontrado' });
  }
});
/* -------------------------------------------------------------------------- */
/*                                  server                                 */
/* -------------------------------------------------------------------------- */
const server = app.listen(PORT, () => {
  console.log(`server is runing at http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.log(err);
});
