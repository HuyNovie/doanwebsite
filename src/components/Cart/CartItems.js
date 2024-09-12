import React, { useMemo } from "react";
import "./CartItems.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { useShoppingContext } from "../../contexts/ShoppingContext";
import { formatCurrency } from "../../helpers/common";

const CartItems = () => {
  const { increaseQty, decreaseQty, removeCartItem, cartItems } = useShoppingContext();

  const items = useMemo(() => {
    console.log("CartItems: ", cartItems);
    return cartItems;
  }, [cartItems]);

  return (
    <tbody>
      {items.length > 0 ? (
        items.map(item => (
          <tr key={item.productId} style={{ verticalAlign: "middle", textAlign: "center" }}>
            <td>
              <img
                src={`http://localhost:8080/restaurant/images/${item.imageUrl}`} 
                className='img-fluid rounded'
                alt={item.productName || 'Tên món không có'}
                style={{ width: "100px", height: "auto" }}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'path_to_fallback_image';
                }}
              />
            </td>
            <td style={{ width: "200px", wordWrap: "break-word" }}>
              {item.productName || 'Tên món không có'}
            </td>
            <td>{formatCurrency(item.unitPrice || 0)}</td>
            <td style={{ width: "200px", wordWrap: "break-word" }}>
              <button type="button" className="btn btn-sm btn-secondary" onClick={() => {
                console.log(`Decrease quantity for ${item.productId}`);
                decreaseQty(item.productId);
              }}>
                <strong>-</strong>
              </button>
              <span className="px-3">{item.quantity || 0}</span>
              <button type="button" className="btn btn-sm btn-secondary" onClick={() => {
                console.log(`Increase quantity for ${item.productId}`);
                increaseQty(item.productId);
              }}>
                <strong>+</strong>
              </button>
            </td>
            <td style={{ width: "200px" }}>
              {formatCurrency((item.unitPrice || 0) * (item.quantity || 0))}
            </td>
            <td>
              <button className="btn btn-sm btn-danger btn-remove" onClick={() => {
                console.log(`Remove item ${item.productId}`);
                removeCartItem(item.productId);
              }}>
                <FaRegTrashAlt />
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" style={{ textAlign: "center" }}>Giỏ hàng trống</td>
        </tr>
      )}
    </tbody>
  );
};

export default CartItems;
