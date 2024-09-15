import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const CustomerProfile = () => {
  return (
    <Container className="mt-5" style={{ textAlign: 'center' }}>
      <h1>Trang Cá Nhân</h1>
      <div
        className="customer-functions"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Card className="mb-3" style={{ width: '400px' }}>
          <Card.Body>
            <Card.Title>Quản lý Thông Tin Cá Nhân</Card.Title>
            <Link to="/customer/edit-profile">
              <Button variant="primary">Sửa Thông Tin Cá Nhân</Button>
            </Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '400px' }}>
          <Card.Body>
            <Card.Title>Xem Đơn Đặt bàn</Card.Title>
            <Link to="/customer/user-Booking">
              <Button variant="secondary">Xem Đơn Đặt bàn của bạn</Button>
            </Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '400px' }}>
          <Card.Body>
            <Card.Title>Xem Đơn Hàng</Card.Title>
            <Link to="/customer/my-orders">
              <Button variant="secondary">Xem Đơn Hàng của Bạn</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default CustomerProfile;
