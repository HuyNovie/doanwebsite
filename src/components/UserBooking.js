import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { Button, Table } from "react-bootstrap";
import moment from "moment"; 

const UserBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    const user = localStorage.getItem("user");
    const email = user.email;
    const phone = user.phone;

    try {
      const response = await api.get("/booking/search", {
        params: { emailOrPhone: email || phone }
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đặt bàn của người dùng:", error);
    }
  };
  

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/booking/${id}`);
      fetchUserBookings(); 
    } catch (error) {
      console.error("Lỗi khi xóa đặt bàn:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/booking/${selectedBooking.id}`, selectedBooking);
      fetchUserBookings();
      setSelectedBooking(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật đặt bàn:", error);
    }
  };

  return (
    <div className="container">
      <h1>Đơn Đặt Bàn</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Số Điện Thoại</th>
            <th>Ngày Đặt</th>
            <th>Chi Nhánh</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.phone}</td>
              <td>{moment(booking.bookingDate).format("YYYY-MM-DD HH:mm:ss.SSSSSS")}</td> 
              <td>{booking.branch}</td>
              <td>
                <Button onClick={() => handleEdit(booking)}>Sửa</Button>
                <Button onClick={() => handleDelete(booking.id)} variant="danger">Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedBooking && (
        <div className="edit-form">
          <h2>Sửa Đặt Bàn</h2>
          <form>
            <div>
              <label>Họ Tên:</label>
              <input
                type="text"
                value={selectedBooking.name}
                onChange={(e) => setSelectedBooking({ ...selectedBooking, name: e.target.value })}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={selectedBooking.email}
                onChange={(e) => setSelectedBooking({ ...selectedBooking, email: e.target.value })}
              />
            </div>
            <div>
              <label>Số Điện Thoại:</label>
              <input
                type="tel"
                value={selectedBooking.phone}
                onChange={(e) => setSelectedBooking({ ...selectedBooking, phone: e.target.value })}
              />
            </div>
            <div>
              <label>Ngày Đặt:</label>
              <input
                type="datetime-local"
                value={moment(selectedBooking.bookingDate).format("YYYY-MM-DDTHH:mm:ss")}
                onChange={(e) => setSelectedBooking({ ...selectedBooking, bookingDate: moment(e.target.value).format("yyyy-MM-DD HH:mm:ss.SSSSSS") })}
              />
            </div>
            <div>
              <label>Chi Nhánh:</label>
              <input
                type="text"
                value={selectedBooking.branch}
                onChange={(e) => setSelectedBooking({ ...selectedBooking, branch: e.target.value })}
              />
            </div>
            <Button onClick={handleUpdate}>Cập Nhật</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserBooking;
