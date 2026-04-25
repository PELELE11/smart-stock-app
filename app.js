const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Stock data (temporary, in memory)
let products = [];

// ===== API ROUTES =====

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Add product
app.post('/api/products', (req, res) => {
  const { name, qty } = req.body;

  if (!name || !qty) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const product = {
    id: Date.now(),
    name,
    qty
  };

  products.push(product);
  res.json(product);
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ message: 'Product deleted' });
});

// Health check (for Azure)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Frontend fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Smart Stock App running on port ${PORT}`);
});