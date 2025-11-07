const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');
const { v4: uuidv4 } = require('uuid');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const checkoutRouter = require('./routes/checkout');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new Database('./db/database.db'); // creates file if not exists
// create tables if not exists
db.exec(`
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT,
  price REAL
);
CREATE TABLE IF NOT EXISTS cart_items (
  id TEXT PRIMARY KEY,
  productId TEXT,
  qty INTEGER
);
`);

app.locals.db = db; // make DB accessible in routes

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);

// seed products if empty
const row = db.prepare('SELECT COUNT(*) AS count FROM products').get();
if (row.count === 0) {
  const insert = db.prepare('INSERT INTO products (id,name,price) VALUES (?,?,?)');
  const sample = [
    ['p1','Cool T-Shirt', 12.99],
    ['p2','Sneakers', 59.99],
    ['p3','Coffee Mug', 8.5],
    ['p4','Wireless Mouse', 19.9],
    ['p5','Notebook', 4.25]
  ];
  const insertMany = db.transaction((items) => {
    for (const it of items) insert.run(uuidv4(), it[1], it[2]);
  });
  insertMany(sample);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
