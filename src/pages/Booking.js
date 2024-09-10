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
        <main style={{marginTop: "150px"}}>
            <table className="booking">
            <div className='booking'>
                <div className="row">
                    <div className="TitleBook">BOOKING / ĐẶT BÀN</div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="thongtinbook">Full Name / Họ Tên:</div>
                    </div>
                    <div className="col-lg-6">
                        <div className="thongtinbook">Email:</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <input
                            className="textbook"
                            type="text"
                            placeholder="Aa"
                            name="hoten"
                        />
                    </div>
                    <div className="col-lg-6">
                        <input
                            className="textbook"
                            type="email"
                            placeholder="Aa"
                            name="email"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="thongtinbook">Phone Number / Số Điện Thoại:</div>
                    </div>
                    <div className="col-lg-6">
                        <div className="thongtinbook">Number Of Guests / Số Khách:</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <input
                            className="textbook"
                            type="tel"
                            placeholder=""
                            name="sdt"
                        />
                    </div>
                    <div className="col-lg-6">
                        <input
                            className="textbook"
                            type="number"
                            placeholder="1"
                            name="sokhach"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='thongtinbook'>Restaurant / Nhà Hàng:</div>
                        <select className='luachon'>
                            <option value={1}>--- Choose Brand / Chọn Thương Hiệu ---</option>
<option value={2}>KOREAN KUISINE</option>
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='thongtinbook'>Branch / Chi Nhánh:</div>
                        <select className='luachon'>
                            <option value={1}>--- First, Please Choose Brand / Vui Lòng Chọn Thương Hiệu Trước ---</option>
                            <option value={2}>10 / 10 An Phú Đông, An Phú Đông, Q.12, Việt Nam</option>
                            <option value={3}>20 / 10 An Phú Đông, An Phú Đông, Q.12, Việt Nam</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="thongtinbook">Booking Date / Ngày Đặt:</div>
                    </div>
                    <div className="col-lg-6">
                        <div className="thongtinbook">Time / Giờ:</div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <input
                                className="textbook"
                                type="date"
                                name="ngaydat"
                            />
                        </div>
                        <div className="col-lg-6">
                            <input
                                className="textbook"
                                type="time"
                                name="thoigiandat"
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='thongtinbook'>Special Requirements / Yêu Cầu Đặc Biệt:</div>
                        <textarea
                            rows={4}
                            cols={50}
                            className='textnote'
                            placeholder='Aa'
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='thongtinbook'>
                            <input type='checkbox' /> I want to confirm my reservation by email / Tôi muốn xác nhận đặt bàn qua Email
                        </div>
                        <Button className='button_booking'>Đặt Bàn</Button>
                    </div>
                </div>
            </div>
            </table>
        </main>
    )
}

export default Booking;