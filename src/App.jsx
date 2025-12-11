import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart";
import Products from "./pages/Products";

function App() {
  return (
    <div className="app-root">
      <header className="header">
        <h1>Mini Marketplace</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">
            Products
          </Link>
          <Link to="/cart" className="nav-link">
            Cart
          </Link>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
