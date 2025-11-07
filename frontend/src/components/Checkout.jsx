import React, { useState } from "react";
import { checkout } from "../api";

function Checkout({ cart }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await checkout(cart, form.name, form.email);
    setReceipt(res);
  };

  return (
    <div>
      <h2>Checkout</h2>
      {!receipt ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <button type="submit">Place Order</button>
        </form>
      ) : (
        <div className="receipt">
          <h3>Order Successful!</h3>
          <p>Total: ₹{receipt.total}</p>
          <p>Time: {new Date(receipt.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;
