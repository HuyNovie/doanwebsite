import { useState } from "react";
import React from "react";
import { Button } from "react-bootstrap";
import "./Booking.css";

const Booking = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return ( 
        <main className="container" style={{paddingTop:"150px"}}>
            <div className="booking-form">
                <div className="row">
                    <div className="col-12 text-center TitleBook">ĐẶT BÀN</div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-12"> 
                        <label className="thongtinbook">Họ Tên:</label>
                        <input className="form-control" type="text" placeholder="" name="hoten"/>
                    </div>
                    <div className="col-md-6 col-12">
                        <label className="thongtinbook">Email:</label>
                        <input
                            className="form-control"
                            type="email"
                            placeholder=""
                            name="email"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-12">
                        <label className="thongtinbook">Số Điện Thoại:</label>
                        <input
                            className="form-control"
                            type="tel"
                            placeholder=""
                            name="sdt"
                        />
                    </div>
                    <div className="col-md-6 col-12">
                        <label className="thongtinbook">Số Khách:</label>
                        <input
                            className="form-control"
                            type="number"
                            placeholder="1"
                            name="sokhach"
                            min="1"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <label className="thongtinbook">Nhà Hàng:</label>
                        <select className="form-control luachon">
                            <option value={1}>--- Chọn Thương Hiệu ---</option>
                            <option value={2}>KOREAN KUISINE</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <label className="thongtinbook">Chi Nhánh:</label>
                        <select className="form-control luachon">
                            <option value={1}>--- Vui Lòng Chọn Thương Hiệu Trước ---</option>
                            <option value={2}>10 / 10 An Phú Đông, An Phú Đông, Q.12, Việt Nam</option>
                            <option value={3}>20 / 10 An Phú Đông, An Phú Đông, Q.12, Việt Nam</option>
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
                        />
                    </div>
                    <div className="col-md-6 col-12">
                        <label className="thongtinbook">Giờ:</label>
                        <input
                            className="form-control"
                            type="time"
                            name="thoigiandat"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <label className="thongtinbook">Yêu Cầu Đặc Biệt:</label>
                        <textarea
                            rows={4}
                            cols={50}
                            className="form-control textnote"
                            placeholder="Aa"
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <div className="thongtinbook">
                            <input type="checkbox" />Tôi muốn xác nhận đặt bàn qua Email
                        </div>
                        <Button className="button_booking">Đặt Bàn</Button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Booking;
