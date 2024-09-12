import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShoppingContext } from '../contexts/ShoppingContext';
import { formatCurrency } from '../helpers/common';
import { FaRegTrashAlt } from "react-icons/fa";
import api from '../api/axios'; 

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, totalPrice, increaseQty, decreaseQty, removeCartItem, clearCart } = useShoppingContext();

    const handlePayment = async () => {
        const token = localStorage.getItem('jwtToken');
        
        if (!token) {
            navigate('/login');
            return;
        }
        
        try {
            const introspectResponse = await api.post('/auth/introspect', {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
    
            if (introspectResponse.data.result.valid) {
                const userName = introspectResponse.data.result.userName;
    
                if (!userName) {
                    console.error('Username not found in token');
                    return;
                }
    
                const orderData = {
                    userName: userName,
                    totalAmount: totalPrice || 0,
                    items: cartItems.map(item => ({
                        productId: item.id || '',
                        productName: item.productName || 'Tên món không có',
                        quantity: item.quantity || 0,
                        unitPrice: item.unitPrice || 0,
                        totalPrice: (item.unitPrice || 0) * (item.quantity || 0)
                    })),
                };
    
                const response = await api.post('/orders/create', orderData, {
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                });
    
                if (response.status === 200) {
                    clearCart();
                    navigate('/payment-confirmation');
                } else {
                    console.error('Error creating order:', response.data.message);
                }
            } else {
                console.error('Token không hợp lệ.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="row" style={{ padding: "2% 8%", marginRight: 0 }}>
            <h3>Giỏ hàng</h3>
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
                    {cartItems.map(item => (
                        <tr key={item.productId} style={{ verticalAlign: "middle", textAlign: "center" }}>
                            <td><img src={`http://localhost:8080/restaurant/images/${item.imageUrl}`} className='img-fluid rounded' alt={item.productName} /></td>
                            <td style={{ width: "200px", wordWrap: "break-word" }}>{item.productName}</td>
                            <td>{formatCurrency(item.unitPrice)}</td>
                            <td style={{ width: "200px", wordWrap: "break-word" }}>
                                <button type="button" className="btn btn-sm btn-secondary" onClick={() => decreaseQty(item.productId)}><strong>-</strong></button>
                                <span className="px-3">{item.quantity}</span>
                                <button type="button" className="btn btn-sm btn-secondary" onClick={() => increaseQty(item.productId)}><strong>+</strong></button>
                            </td>
                            <td style={{ width: "200px" }}>{formatCurrency(item.unitPrice * item.quantity)}</td>
                            <td>
                                <button className="btn btn-sm btn-danger btn-remove" onClick={() => removeCartItem(item.productId)}>
                                    <FaRegTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='col-md-12'>
                <span className='float-end me-2'><strong>Tổng tiền:</strong><strong className='text-danger px-3'>{formatCurrency(totalPrice)}</strong></span>
            </div>
            <div className='col-md-12 mt-5'>
                <Link to='/menu' className='btn btn-sm btn-primary float-start'>Tiếp tục mua </Link>
                <button className='btn btn-sm btn-success float-end me-2 d-block' onClick={handlePayment}>Thanh toán</button>
            </div>
        </div>
    );
}

export default Checkout;

