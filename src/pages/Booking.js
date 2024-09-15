import { useState } from "react";
import React from "react";
import { Button } from "react-bootstrap";
import api from "../api/axios";
import moment from "moment";
import "./Booking.css";

const Booking = () => {
  const [formData, setFormData] = useState({
    hoten: "",
    email: "",
    sdt: "",
    sokhach: 1,
    table: "",
    chinhanh: "",
    ngaydat: "",
    thoigiandat: "",
    yeucau: "",
    xacnhanEmail: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const bookingDateTime = `${formData.ngaydat} ${formData.thoigiandat}`;
      const formattedDateTime = moment(
        bookingDateTime,
        "YYYY-MM-DD HH:mm"
      ).format("YYYY-MM-DD HH:mm:ss.SSSSSS");

      const response = await api.post("/booking/create", {
        name: formData.hoten,
        email: formData.email,
        phone: formData.sdt,
        numberOfGuests: formData.sokhach,
        branch: formData.chinhanh,
        table: formData.table,
        note: formData.yeucau,
        bookingDate: formattedDateTime,
      });

      console.log("Đặt bàn thành công:", response.data);
      alert("Đặt bàn thành công!");
    } catch (error) {
      console.error("Lỗi khi đặt bàn:", error);
      alert("Có lỗi xảy ra khi đặt bàn.");
    }
  };

  return (
    <main className="container" style={{ paddingTop: "20px" }}>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="row">
          <div className="col-12 text-center TitleBook">ĐẶT BÀN</div>
        </div>

        {/* Họ tên */}
        <div className="row">
          <div className="col-md-6 col-12">
            <label className="thongtinbook">Họ Tên:</label>
            <input
              className="form-control"
              type="text"
              name="hoten"
              value={formData.hoten}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 col-12">
            <label className="thongtinbook">Email:</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-12">
            <label className="thongtinbook">Số Điện Thoại:</label>
            <input
              className="form-control"
              type="tel"
              name="sdt"
              value={formData.sdt}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 col-12">
            <label className="thongtinbook">Số Khách:</label>
            <input
              className="form-control"
              type="number"
              name="sokhach"
              value={formData.sokhach}
              onChange={handleChange}
              min="1"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <label className="thongtinbook">Bàn số:</label>
            <select
              className="form-control luachon"
              name="table"
              value={formData.table}
              onChange={handleChange}
            >
              <option value="">--- Chọn bàn ---</option>
              <option value="1 / 1">1</option>
              <option value="2 / 2">2</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <label className="thongtinbook">Chi Nhánh:</label>
            <select
              className="form-control luachon"
              name="chinhanh"
              value={formData.chinhanh}
              onChange={handleChange}
            >
              <option value="">--- Chọn chi nhánh ---</option>
              <option value="10 / 10 An Phú Đông, Q.12">
                10 / 10 An Phú Đông, Q.12
              </option>
              <option value="20 / 10 An Phú Đông, Q.12">
                20 / 10 An Phú Đông, Q.12
              </option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-12">
            <label className="thongtinbook">Ngày Đặt:</label>
            <input
              className="form-control"
              type="date"
              name="ngaydat"
              value={formData.ngaydat}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 col-12">
            <label className="thongtinbook">Giờ:</label>
            <input
              className="form-control"
              type="time"
              name="thoigiandat"
              value={formData.thoigiandat}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <label className="thongtinbook">Yêu Cầu Đặc Biệt:</label>
            <textarea
              rows={4}
              className="form-control textnote"
              name="yeucau"
              value={formData.yeucau}
              onChange={handleChange}
              placeholder="Yêu cầu đặt biệt..."
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <div className="thongtinbook">
              <input
                type="checkbox"
                name="xacnhanEmail"
                checked={formData.xacnhanEmail}
                onChange={handleChange}
              />{" "}
              Tôi muốn xác nhận đặt bàn qua Email
            </div>
            <Button type="submit" className="button_booking">
              Đặt Bàn
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Booking;
