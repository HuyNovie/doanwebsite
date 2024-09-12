import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Spinner, Alert } from 'react-bootstrap';
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
            <ListGroup.Item key={order.id}>Đơn hàng {order.id}</ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>Chưa có đơn hàng nào.</ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
};

export default MyOrders;
