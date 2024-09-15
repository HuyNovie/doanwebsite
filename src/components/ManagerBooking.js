import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Spinner, Alert, Row, Col } from 'react-bootstrap';
import api from '../api/axios';
import moment from 'moment'; 

const ManagerBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/booking/get-all');
        const formattedBookings = response.data.map(booking => ({
          ...booking,
          bookingDate: moment(booking.bookingDate).format('YYYY-MM-DD HH:mm:ss.SSSSSS'),  // Định dạng thời gian
        }));
        setBookings(formattedBookings);
      } catch (error) {
        setError('Lỗi khi lấy thông tin đặt chỗ.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-5">
      <h1>Quản Lý Đặt Chỗ</h1>
      <ListGroup>
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <ListGroup.Item key={booking.id}>
              <Row>
                <Col md={6}>
                  <h5>Tên: {booking.name}</h5>
                  <p>Email: {booking.email}</p>
                  <p>Điện thoại: {booking.phone}</p>
                  <p>Số khách: {booking.numberOfGuests}</p>
                  <p>Chi nhánh: {booking.branch}</p>
                  <p>Bàn: {booking.table}</p>
                  <p>Ghi chú: {booking.note}</p>
                  <p>Ngày đặt: {booking.bookingDate}</p>
                </Col>
              </Row>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>Chưa có đặt chỗ nào.</ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
};

export default ManagerBooking;
