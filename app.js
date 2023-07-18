import express from 'express';

const app = express();
app.use(express.json());

let products = [];
let productId = 1;

app.get('/products', (req, res) => {
  res.json(products);
  console.log('List provided');
});

app.post('/products', (req, res) => {
  const newProduct = req.body;
  newProduct.id = productId++;
  products.push(newProduct);
  res.status(201).json(newProduct);
  console.log('Product added');
});

app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  const productIndex = products.findIndex((product) => product.id === productId);

  if (productIndex === -1) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    products.splice(productIndex, 1);
    res.json({ message: 'Product deleted successfully' });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});