import React, { useContext } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

export const Cart = () => {
  const {
    cartItems,
    decreaseCartQuantity,
    queryRemoveCartItem,
    getTotalCartCost,
  } = useContext(ShopContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:4000/create-checkout-session",
      {
        cartItems,
      }
    );

    const { url } = res.data;
    window.location.href = url;
  };

  return (
    <>
      {cartItems ? (
        <div className="cart">
          <div className="cart-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          {cartItems.map((item) => {
            return (
              <div>
                <div className="cart-format cart-format-main">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="cart-product-icon"
                  />
                  <p>{item.product.title}</p>
                  <p>${item.product.price.toFixed(2)}</p>
                  <button>{item.quantity}</button>
                  <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                  <ClearIcon
                    onClick={() => {
                      decreaseCartQuantity(item.product);
                      queryRemoveCartItem(item.product);
                    }}
                    className="cart-remove-icon"
                  />
                </div>
              </div>
            );
          })}
          <div className="cart-down">
            <div className="cart-total">
              <p>Cart Total:</p>
              <div>
                <div className="cart-total-item">
                  <p>Subtotal</p>
                  <p>${getTotalCartCost()}</p>
                </div>
                <hr />
                <div className="cart-total-item">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="cart-total-item">
                  <p>Total</p>
                  <p>${getTotalCartCost()}</p>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                {cartItems.length !== 0 ? (
                  <button className="activebutton">Proceed To Checkout</button>
                ) : (
                  <button className="inactivebutton" disabled>
                    Proceed To Checkout
                  </button>
                )}
              </form>
            </div>
            <div className="cart-promocode">
              <p>Enter any promo code here</p>
              <div className="cart-promobox">
                <input type="text" placeholder="Promo Code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No Products In Cart</div>
      )}
    </>
  );
};
