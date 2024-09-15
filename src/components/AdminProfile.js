import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AdminProfile = () => {
  return (
    <Container className=" d-flex flex-column align-items-center mt-5">
      <h1 className="text-center mt-5 mb-4">Admin Dashboard</h1>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={6} className="mb-4 d-flex justify-content-center">
          <Card style={{ width: '18rem' }}>
            <Card.Body className="text-center">
              <Card.Title>Quản lý Sản Phẩm</Card.Title>
              <Button variant="success" as={Link} to="/admin/product-management" className="mb-2">
                Thêm, Xóa, Sửa Sản Phẩm
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={6} className="mb-4 d-flex justify-content-center">
          <Card style={{ width: '18rem' }}>
            <Card.Body className="text-center">
              <Card.Title>Quản lý Đơn Hàng</Card.Title>
              <Button variant="warning" as={Link} to="/admin/order-management">
                Xem Đơn Hàng
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={6} className="mb-4 d-flex justify-content-center">
          <Card style={{ width: '18rem' }}>
            <Card.Body className="text-center">
              <Card.Title>Quản lý Đơn đăt bàn</Card.Title>
              <Button variant="warning" as={Link} to="/admin/manager-booking">
                Xem đặt bàn
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={6} className="mb-4 d-flex justify-content-center">
          <Card style={{ width: '18rem' }}>
            <Card.Body className="text-center">
              <Card.Title>Quản lý Người Dùng</Card.Title>
              <Button variant="danger" as={Link} to="/admin/user-management">
                Xem, Xóa, Sửa Người Dùng
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProfile;
