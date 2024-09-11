import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from 'jwt-decode'; // Sử dụng cách nhập khẩu đúng
import { useNavigate } from 'react-router-dom';

const ShoppingContext = createContext();

export const useShoppingContext = () => {
  return useContext(ShoppingContext);
};

export const ShoppingContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const decodedToken = jwtDecode(token); // Không cần .default
        const userId = decodedToken.userId || decodedToken.sub;

        if (!userId) {
          console.error("User ID not found in token");
          return;
        }

        const response = await axios.post("/carts/create", { userId });
        setCartId(response.data.result.id);
        setCartItems(response.data.result.items);
      } catch (error) {
        console.error("Error loading cart:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addCartItem = async (product, quantity = 1) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const currentCartItem = cartItems.find((item) => item.id === product.id);
    if (currentCartItem) {
      updateQty(product.id, quantity);
    } else {
      try {
        const response = await axios.post("/carts/add", {
          cartId,
          productId: product.id,
          quantity,
        });
        setCartItems(response.data.result.items);
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    }
  };

  const removeCartItem = async (id) => {
    try {
      await axios.post("/carts/remove", { cartId, productId: id });
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const increaseQty = (id) => {
    updateQty(id, 1);
  };

  const decreaseQty = (id) => {
    const currentCartItem = cartItems.find((item) => item.id === id);
    if (currentCartItem && currentCartItem.qty === 1) {
      removeCartItem(id);
    } else {
      updateQty(id, -1);
    }
  };

  const updateQty = (id, delta) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + delta } : item
      )
    );
  };

  return (
    <ShoppingContext.Provider
      value={{
        cartItems,
        addCartItem,
        removeCartItem,
        increaseQty,
        decreaseQty,
        loading,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContextProvider;
