import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const CustomerProfile = () => {
  return (
    <Container className="mt-5">
      <h1>Trang Cá Nhân</h1>
      <div className="customer-functions">
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Quản lý Thông Tin Cá Nhân</Card.Title>
            <Link to="/customer/edit-profile">
              <Button variant="primary">Sửa Thông Tin Cá Nhân</Button>
            </Link>
          </Card.Body>
        </Card>

        <Card>
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
