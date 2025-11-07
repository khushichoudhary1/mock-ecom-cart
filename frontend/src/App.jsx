import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import "./App.css";

function App() {
  const [view, setView] = useState("products");
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const res = await fetch("http://localhost:5000/api/cart");
    const data = await res.json();
    setCart(data.items || []);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>🛒 Mock E-Com Cart</h1>
        <nav>
          <button onClick={() => setView("products")}>Products</button>
          <button onClick={() => setView("cart")}>
            Cart ({cart.length})
          </button>
          <button onClick={() => setView("checkout")}>Checkout</button>
        </nav>
      </header>

      {view === "products" && <ProductList refreshCart={fetchCart} />}
      {view === "cart" && <Cart refreshCart={fetchCart} />}
      {view === "checkout" && <Checkout cart={cart} refreshCart={fetchCart} />}
    </div>
  );
}

export default App;
