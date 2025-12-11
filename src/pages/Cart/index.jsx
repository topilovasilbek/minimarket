import React, { useContext } from "react";
import { CartContext } from "./../../context/CartContext";
import "./style.css";

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (!cart.length) return <div className="empty">Cart is empty</div>;

  return (
    <div className="cart-wrap">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="info">
              <p className="title">{item.title}</p>
              <p className="price">${item.price.toFixed(2)}</p>
              <div className="qty">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>
            </div>
            <button className="remove" onClick={() => removeFromCart(item.id)}>
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="total-bar">
        <p>
          Total: <strong>${total.toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
}
