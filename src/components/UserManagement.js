import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Form, Spinner, Alert, Card } from 'react-bootstrap';
import api from '../api/axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    username: '',
    mail: '',
    phone: '',
    firstName: '',
    lastName: '',
    dayOfBirth: '',
    password: '', 
  });
  const [errors, setErrors] = useState({
    username: '',
    mail: '',
    phone: '',
  });
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users/user');
      setUsers(response.data.result);
    } catch (error) {
      setError("Lỗi khi lấy danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!userData.username) newErrors.username = "Tên người dùng không được để trống.";
    if (!userData.mail) newErrors.mail = "Email không được để trống.";
    else if (!/\S+@\S+\.\S+/.test(userData.mail)) newErrors.mail = "Email không hợp lệ.";
    if (!userData.phone) newErrors.phone = "Số điện thoại không được để trống.";
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '', 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newUserData = {
      ...userData,
      password: userData.password || '12345678', 
    };

    try {
      await api.post('/users/register', newUserData);
      alert("Thêm người dùng thành công!");
      setUserData({
        username: '',
        mail: '',
        phone: '',
        firstName: '',
        lastName: '',
        dayOfBirth: '',
        password: '', 
      });
      await fetchUsers();
    } catch (error) {
      setError("Lỗi khi thêm người dùng.");
    }
  };

  const handleReset = () => {
    setUserData({
      username: '',
      mail: '',
      phone: '',
      firstName: '',
      lastName: '',
      dayOfBirth: '',
      password: '',
    });
    setErrors({});
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card className="mb-3 shadow-sm">
            <Card.Header className="bg-primary text-white">Danh sách người dùng</Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <ListGroup>
                {users.map(user => (
                  <ListGroup.Item key={user.id} className="border-0 rounded mb-2 shadow-sm">
                    <div className="d-flex flex-column">
                      <h5 className="mb-1">{user.username}</h5>
                      <p className="text-muted mb-1"><strong>Email:</strong> {user.mail}</p>
                      <p className="text-muted mb-1"><strong>Số điện thoại:</strong> {user.phone}</p>
                      <p className="text-muted mb-1"><strong>Tên:</strong> {user.firstName}</p>
                      <p className="text-muted mb-1"><strong>Họ:</strong> {user.lastName}</p>
                      <p className="text-muted mb-1"><strong>Ngày sinh:</strong> {user.dayOfBirth}</p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">Thông tin người dùng</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên người dùng</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="mail"
                    value={userData.mail}
                    onChange={handleInputChange}
                    isInvalid={!!errors.mail}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mail}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Họ</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ngày sinh</Form.Label>
                  <Form.Control
                    type="date"
                    name="dayOfBirth"
                    value={userData.dayOfBirth}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="me-2">Thêm người dùng</Button>
                <Button variant="secondary" onClick={handleReset}>Reset thông tin</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserManagement;
