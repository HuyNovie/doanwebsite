import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Spinner, Alert, Row, Col } from 'react-bootstrap';
import api from '../api/axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserIdAndOrders = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const userResponse = await api.get('/users/my-info', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userId = userResponse.data.result.id;
        setUserId(userId);

        const ordersResponse = await api.get(`/orders/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(ordersResponse.data.result);
        console.log(ordersResponse.data.result);
      } catch (error) {
        setError('Lỗi khi lấy đơn hàng.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserIdAndOrders();
  }, []);

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-5">
      <h1>Đơn Hàng Của Tôi</h1>
      <ListGroup>
        {orders.length > 0 ? (
          orders.map(order => (
            <ListGroup.Item key={order.orderId}>
              <Row>
                <Col md={8}>
                  <h5>Đơn hàng ID: {order.orderId}</h5>
                  <p>Ngày đặt hàng: {new Date(order.ordersDate).toLocaleString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                  <p>Phương thức thanh toán: {order.paymentMethod}</p>
                  <p>Mã khuyến mãi: {order.promoCode || 'Không có'}</p>
                  <p>Tổng tiền: {order.totalAmount.toLocaleString()} VND</p>
                </Col>
                <Col md={4}>
                  <h6>Chi tiết đơn hàng:</h6>
                  <ListGroup variant="flush">
                    {order.orderDetailResponses.map((detail) => (
                      <ListGroup.Item key={detail.id}>
                        {detail.productName} - {detail.quantity} x {detail.unitPrice.toLocaleString()} VND
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>Chưa có đơn hàng nào.</ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
};

export default MyOrders;
