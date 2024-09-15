import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import api from '../api/axios';

const EditProfile = () => {
  const [userData, setUserData] = useState({
    id: '',
    username: '',
    mail: '',
    phone: '',
    firstName: '',
    lastName: '',
    dayOfBirth: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await api.get('/users/my-info');
        const result = response.data.result;
        setUserData({
          id: result.id || '', 
          username: result.username || '',
          mail: result.mail || '',
          phone: result.phone || '',
          firstName: result.firstName || '',
          lastName: result.lastName || '',
          dayOfBirth: result.dayOfBirth || '',
        });
      } catch (error) {
        setError("Lỗi khi lấy thông tin cá nhân.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${userData.id}`, userData);
      alert('Cập nhật thông tin cá nhân thành công!');
    } catch (error) {
      setError("Lỗi khi cập nhật thông tin cá nhân.");
    }
  };

  if (loading) {
    return <div className="text-center"><Spinner animation="border" /></div>;
  }

  return (
    <Container className="mt-5">
      <h1>Chỉnh sửa thông tin cá nhân</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Tên người dùng</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            disabled
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="mail"
            value={userData.mail}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Họ</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Ngày sinh</Form.Label>
          <Form.Control
            type="date"
            name="dayOfBirth"
            value={userData.dayOfBirth}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Cập nhật thông tin</Button>
      </Form>
    </Container>
  );
};

export default EditProfile;
