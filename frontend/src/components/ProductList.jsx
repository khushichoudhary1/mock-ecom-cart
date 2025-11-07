import React, { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api";

function ProductList({ refreshCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleAdd = async (id) => {
    await addToCart(id);
    refreshCart();
  };

  return (
    <div className="grid">
      {products.map((p) => (
        <div key={p.id} className="card">
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button onClick={() => handleAdd(p.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
