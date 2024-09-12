import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios"; 
import { useNavigate } from "react-router-dom";

const ShoppingContext = createContext();

export const useShoppingContext = () => {
  return useContext(ShoppingContext);
};

export const ShoppingContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  const loadCart = async () => {
    if (isCartLoaded) return;

    setLoading(true);
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const introspectResponse = await api.post(
        "/auth/introspect",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (introspectResponse.data.result.valid) {
        const userName = introspectResponse.data.result.userName;

        if (!userName) {
          console.error("Username not found in token");
          setLoading(false);
          return;
        }

        const cartResponse = await api.get(
          `/carts/current?userName=${userName}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (cartResponse.data.result) {
          const cartData = cartResponse.data.result;

          setCartId(cartData.id);
          setCartItems(cartData.items || []);
          setIsCartLoaded(true);
          console.log("Giỏ hàng đã được tải thành công.");
        } else {
          const createResponse = await api.post(
            "/carts/create",
            { userName },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const newCartData = createResponse.data.result;
          setCartId(newCartData.id);
          setCartItems(newCartData.items || []);
          setIsCartLoaded(true);
          console.log("Tạo giỏ hàng thành công.");
        }
      } else {
        console.error("Token không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addCartItem = async (product, quantity = 1) => {
    try {
      const response = await api.post("/carts/add", {
        cartId,
        productId: product.productId, 
        quantity,
      });

      if (response.data.result) {
        setCartItems(response.data.result.items || []);
        console.log("Thêm thành công vào giỏ hàng");
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    }
  };

  const removeCartItem = async (id) => {
    try {
      const response = await api.post("/carts/remove", { cartId, productId: id });

      if (response.data.result) {
        setCartItems(response.data.result.items || []);
        console.log("Sản phẩm đã được xóa khỏi giỏ hàng");
      } else {
        console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
    }
  };

  const increaseQty = async (id) => {
    const product = cartItems.find(item => item.productId === id);
    
    if (product) {
      await addCartItem(product, 1); 
    }
  };

  const decreaseQty = async (id) => {
    const product = cartItems.find(item => item.productId === id);
    
    if (product) {
      if (product.quantity === 1) { 
        await removeCartItem(id);
      } else {
        await addCartItem(product, -1);
      }
    }
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
        clearCart: () => setCartItems([]),
        totalPrice: cartItems.reduce(
          (total, item) => total + item.unitPrice * item.quantity, 
          0
        ),
        cartQty: cartItems.reduce((total, item) => total + item.quantity, 0), 
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContextProvider;
