import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShoppingContext } from "../contexts/ShoppingContext";
import { formatCurrency } from "../helpers/common";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../api/axios";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    totalPrice,
    increaseQty,
    decreaseQty,
    removeCartItem,
    clearCart,
  } = useShoppingContext();

  const handlePayment = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      navigate("/login");
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
          return;
        }

        const orderData = {
          userName: userName,
          totalAmount: totalPrice || 0,
          items: cartItems.map((item) => ({
            productId: item.id || "",
            productName: item.productName || "Tên món không có",
            quantity: item.quantity || 0,
            unitPrice: item.unitPrice || 0,
            totalPrice: (item.unitPrice || 0) * (item.quantity || 0),
          })),
        };

        // Save order data to localStorage
        localStorage.setItem("orderData", JSON.stringify(orderData));

        const response = await api.post("/orders/create", orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.code === 1000) {
          navigate("/payment");
        } else {
          console.error("Error creating order:", response.data.message);
        }
      } else {
        console.error("Token không hợp lệ.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="row" style={{ padding: "2% 8%" }}>
      <h1 className="text-warning">Giỏ hàng</h1>
      <table className="table table-hover">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Hình ảnh</th>
            <th>Tên món</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr
              key={item.id}
              style={{ verticalAlign: "middle", textAlign: "center" }}
            >
              <td>
                <img
                  src={`http://localhost:8080/restaurant/images/${item.imageUrl}`}
                  className="img-fluid rounded"
                  alt={item.productName || "Tên món không có"}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </td>

              <td style={{ width: "200px", wordWrap: "break-word" }}>
                {item.productName || "Tên món không có"}
              </td>
              <td>{formatCurrency(item.unitPrice || 0)}</td>
              <td style={{ width: "200px", wordWrap: "break-word" }}>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => decreaseQty(item.id)}
                >
                  <strong>-</strong>
                </button>
                <span className="px-3">{item.quantity || 0}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => increaseQty(item.id)}
                >
                  <strong>+</strong>
                </button>
              </td>
              <td style={{ width: "200px" }}>
                {formatCurrency((item.unitPrice || 0) * (item.quantity || 0))}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger btn-remove"
                  onClick={() => removeCartItem(item.id)}
                >
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="col-md-12">
        <span className="float-end me-2">
          <strong>Tổng tiền:</strong>
          <strong className="text-danger px-3">
            {formatCurrency(totalPrice)}
          </strong>
        </span>
      </div>
      <div className="col-md-12 mt-5">
        <Link to="/menu" className="btn btn-sm btn-primary float-start">
          Tiếp tục mua{" "}
        </Link>
        <button
          className="btn btn-sm btn-success float-end me-2 d-block"
          onClick={handlePayment}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default Checkout;
