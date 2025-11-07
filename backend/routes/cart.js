const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// GET /api/cart -> items + total
router.get('/', (req, res) => {
  const db = req.app.locals.db;
  const items = db.prepare(`
    SELECT c.id, p.id AS productId, p.name, p.price, c.qty
    FROM cart_items c
    JOIN products p ON p.id = c.productId
  `).all();
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  res.json({ items, total });
});

// POST /api/cart -> { productId, qty }
router.post('/', (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty) return res.status(400).json({ error: 'productId and qty required' });

  const db = req.app.locals.db;
  const id = uuidv4();
  db.prepare('INSERT INTO cart_items (id, productId, qty) VALUES (?,?,?)').run(id, productId, qty);
  res.status(201).json({ id, productId, qty });
});

// DELETE /api/cart/:id
router.delete('/:id', (req, res) => {
  const db = req.app.locals.db;
  const info = db.prepare('DELETE FROM cart_items WHERE id = ?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

// PUT /api/cart/:id -> update qty
router.put('/:id', (req, res) => {
  const { qty } = req.body;
  if (typeof qty !== 'number') return res.status(400).json({ error: 'qty required' });
  const db = req.app.locals.db;
  const info = db.prepare('UPDATE cart_items SET qty = ? WHERE id = ?').run(qty, req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

module.exports = router;
