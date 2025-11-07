import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../api";

function Cart({ refreshCart }) {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const load = async () => {
    const data = await getCart();
    setCart(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleRemove = async (id) => {
    await removeFromCart(id);
    refreshCart();
    load();
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cart.items.map((i) => (
            <li key={i.id}>
              {i.name} - ₹{i.price} × {i.qty}
              <button onClick={() => handleRemove(i.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ₹{cart.total}</h3>
    </div>
  );
}

export default Cart;
