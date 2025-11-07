const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const db = req.app.locals.db;
  const products = db.prepare('SELECT id, name, price FROM products').all();
  res.json(products);
});

module.exports = router;
