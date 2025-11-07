const API_BASE = "http://localhost:5000/api";

export const getProducts = async () => {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
};

export const getCart = async () => {
  const res = await fetch(`${API_BASE}/cart`);
  return res.json();
};

export const addToCart = async (productId, qty = 1) => {
  const res = await fetch(`${API_BASE}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, qty }),
  });
  return res.json();
};

export const removeFromCart = async (id) => {
  const res = await fetch(`${API_BASE}/cart/${id}`, { method: "DELETE" });
  return res.json();
};

export const checkout = async (cartItems, name, email) => {
  const res = await fetch(`${API_BASE}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItems, name, email }),
  });
  return res.json();
};
