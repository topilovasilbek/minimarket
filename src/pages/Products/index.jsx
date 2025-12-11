import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "./../../context/CartContext";
import "./style.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    let cancelled = false;
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div className="center">Loading products…</div>;
  if (error) return <div className="center error">Error: {error}</div>;

  const isInCart = (id) => cart.some((item) => item.id === id);

  return (
    <section className="products-wrap">
      <div className="products-grid">
        {products.map((p) => (
          <article key={p.id} className="card">
            <div className="card-media">
              <img src={p.image} alt={p.title} loading="lazy" />
            </div>

            <div className="card-body">
              <h3 className="card-title" title={p.title}>{p.title}</h3>
              <p className="card-category">{p.category}</p>

              <div className="card-bottom">
                <div className="price">${p.price.toFixed(2)}</div>

                {isInCart(p.id) ? (
                  <button
                    className="btn added"
                    onClick={() => removeFromCart(p.id)}
                    onMouseEnter={(e) => (e.target.textContent = "Remove")}
                    onMouseLeave={(e) => (e.target.textContent = "✓ Added")}
                  >
                    ✓ Added
                  </button>
                ) : (
                  <button className="btn" onClick={() => addToCart(p)}>
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}