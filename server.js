const express = require('express');
const app = express();
const PORT = 3000;

// Use built-in middleware to parse JSON
app.use(express.json());

// 📦 In-memory array to store product data
let products = [];

// 🏠 Root route
app.get('/', (req, res) => {
  res.send('🚀 Welcome to the Inventory Management API!');
});

// 🔹 POST /products - Add a new product
app.post('/products', (req, res) => {
  const { name, price, category, stock } = req.body;

  if (!name || !price || !category || !stock) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
    stock
  };

  products.push(newProduct);
  res.status(201).json({ message: 'Product added successfully!', product: newProduct });
});

// 🔹 GET /products - Retrieve all products
app.get('/products', (req, res) => {
  res.json(products);
});

// 🔹 PUT /products/:id - Update a product by ID
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  const { name, price, category, stock } = req.body;

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (category !== undefined) product.category = category;
  if (stock !== undefined) product.stock = stock;

  res.json({ message: 'Product updated successfully!', product });
});

// 🔹 DELETE /products/:id - Remove a product by ID
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  const deletedProduct = products.splice(index, 1)[0];
  res.json({ message: 'Product deleted successfully!', product: deletedProduct });
});

// 🟢 Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
