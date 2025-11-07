Mock E-Com Cart — Full Stack Assignment (Vibe Commerce)
🚀 Overview

A full-stack mock e-commerce shopping cart app built for Vibe Commerce Full Stack Coding Assignment.
The app demonstrates product listing, add/remove cart features, checkout with a mock receipt, and complete UI–API–DB integration.

🧠 Tech Stack

Frontend: React (Vite)
Backend: Node.js + Express
Database: Mock (in-memory) or MongoDB (optional)
API Format: REST
Language: JavaScript

📂 Folder Structure
mock-ecom-cart/
│
├── backend/           # Express backend APIs
│   ├── index.js
│   ├── package.json
│   └── data/
│       └── products.js
│
├── frontend/          # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── ProductList.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Checkout.jsx
│   │   └── api.js
│   ├── package.json
│
└── README.md

⚙️ Features

✅ Display product grid (5–10 mock items)
✅ Add to Cart / Remove from Cart
✅ View Cart — show items, quantities, total
✅ Checkout form (name/email)
✅ Mock receipt with total and timestamp
✅ Responsive layout (desktop + mobile)
✅ REST API integration between frontend and backend

🧩 API Endpoints
Method	Endpoint	Description
GET	/api/products	Fetch all mock products
GET	/api/cart	Get current cart & total
POST	/api/cart	Add item to cart { productId, qty }
DELETE	/api/cart/:id	Remove item from cart
POST	/api/checkout	Mock checkout — returns { total, timestamp }