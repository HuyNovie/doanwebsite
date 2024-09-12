import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import api from '../api/axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/all');
        setOrders(response.data.result);
      } catch (error) {
        setError('Lỗi khi lấy đơn hàng.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Quản lý Đơn Hàng</h1>
      <Row>
        {orders.map(order => (
          <Col md={4} key={order.orderId} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Đơn hàng {order.orderId}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Người dùng: {order.userId}</Card.Subtitle>
                <Card.Text>
                  Ngày tạo: {new Date(order.orderDate).toLocaleDateString()}<br />
                  Tổng số tiền: {order.totalAmount.toFixed(2)} VND
                </Card.Text>
                {order.orderDetailResponses && order.orderDetailResponses.length > 0 && (
                  <Card.Text>
                    <strong>Chi tiết đơn hàng:</strong>
                    <ul>
                      {order.orderDetailResponses.map(detail => (
                        <li key={detail.productId}>
                          {detail.productName} - Số lượng: {detail.quantity} - Đơn giá: {detail.unitPrice.toFixed(2)} VND
                        </li>
                      ))}
                    </ul>
                  </Card.Text>
                )}
                <Button variant="info">Xem Chi Tiết</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OrderManagement;
