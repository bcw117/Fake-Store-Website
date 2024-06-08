import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ShopContext } from "../context/ShopContext";
import logo from "../assets/logo.png";

export function Navbar() {
  const user = useContext(UserContext);
  const { cartItems } = useContext(ShopContext);

  const [menu, setMenu] = useState("shop");

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Store" />
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link to="/">Shop </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("men");
          }}
        >
          <Link to="/mens">Mens</Link> {menu === "men" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("women");
          }}
        >
          <Link to="/womens">Womens</Link>
          {menu === "women" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("electronics");
          }}
        >
          <Link to="/electronics">Electronics</Link>
          {menu === "electronics" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("jewelry");
          }}
        >
          <Link to="/jewelry">Jewelry</Link>
          {menu === "jewelry" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {user ? (
          <Link to="/account" onClick={() => setMenu("account")}>
            <p>My Account</p>
            {menu === "account" ? <hr /> : <></>}
          </Link>
        ) : (
          <Link to="/login" onClick={() => setMenu("login")}>
            <button>Login</button>
            {menu === "login" ? <hr /> : <></>}
          </Link>
        )}
        <Link to="/cart" onClick={() => setMenu("cart")}>
          <ShoppingCartIcon className="h-10" aria-hidden="true" />
          {menu === "cart" ? <hr /> : <></>}
        </Link>
        <div className="nav-cart-count">{cartItems.length}</div>
      </div>
    </div>
  );
}
