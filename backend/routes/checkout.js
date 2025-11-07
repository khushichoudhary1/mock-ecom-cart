const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { cartItems, name, email } = req.body;
  if (!cartItems || !Array.isArray(cartItems)) return res.status(400).json({ error: 'cartItems required' });

  // compute total server-side (defensive)
  const db = req.app.locals.db;
  let total = 0;
  for (const ci of cartItems) {
    const p = db.prepare('SELECT price FROM products WHERE id = ?').get(ci.productId);
    if (!p) return res.status(400).json({ error: `product ${ci.productId} not found` });
    total += p.price * (ci.qty || 1);
  }

  // mock receipt
  const receipt = {
    id: Date.now().toString(),
    name: name || 'Guest',
    email: email || null,
    total,
    items: cartItems,
    timestamp: new Date().toISOString()
  };

  // Optionally: clear cart_items table for "mock user"
  db.prepare('DELETE FROM cart_items').run();

  res.json({ receipt });
});

module.exports = router;
