import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const ShopContext = createContext({});

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:4000/getUserCart", {
          params: {
            email: user.email,
          },
        })
        .then(({ data }) => {
          data.forEach((item) => {
            fetch("https://fakestoreapi.com/products/" + item.productID)
              .then((res) => res.json())
              .then((json) => {
                increaseCartQuantity(json);
              });
          });
        });
    }
  }, [user]);

  const queryCartItem = async (product) => {
    if (user) {
      const res = await axios.post("http://localhost:4000/addToUserCart", {
        email: user.email,
        productID: product.id,
      });

      if (res.status === 202) {
        alert("Item has been added to cart");
      }
    }
  };

  const queryRemoveCartItem = async (product) => {
    if (user) {
      await axios.delete("http://localhost:4000/removeFromUserCart", {
        data: {
          email: user.email,
          productID: product.id,
        },
      });
    }
  };

  const getItemQuantity = (productId) => {
    return (
      cartItems.find((item) => item.productId === productId)?.quantity || 0
    );
  };

  const getTotalCartCost = () => {
    let totalCost = 0;
    let i = 0;
    while (i < cartItems.length) {
      totalCost += cartItems[i].product.price;
      i++;
    }

    return totalCost.toFixed(2);
  };

  const increaseCartQuantity = (product) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.product.id === product.id) == null) {
        return [...currItems, { product: product, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = async (product) => {
    setCartItems((currItems) => {
      if (
        currItems.find((item) => item.product.id === product.id)?.quantity === 1
      ) {
        return currItems.filter((item) => item.product.id !== product.id);
      } else {
        return currItems.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const contextValue = {
    cartItems,
    queryCartItem,
    queryRemoveCartItem,
    getTotalCartCost,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
