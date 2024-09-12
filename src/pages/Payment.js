import React, { useState } from 'react';
import { useShoppingContext } from '../contexts/ShoppingContext';
import { formatCurrency } from '../helpers/common'; 
import { FaRegTrashAlt } from "react-icons/fa"

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const { cartItems, totalPrice} = useShoppingContext();
  console.log(cartItems); 

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted with payment method:', paymentMethod);
  };

  return (
    <main role="main" >
      <div className="container mt-4" style={{paddingTop:"120px",paddingLeft:"50px",paddingRight:"50px"}}>
        <form className="needs-validation" onSubmit={handleSubmit}>
          <div className="py-5 text-center">
            <i className="fa fa-credit-card fa-4x" aria-hidden="true"></i>
            <h1 className='text-warning'>Thanh toán</h1>
            <p className="lead">Vui lòng kiểm tra thông tin Khách hàng, thông tin Giỏ hàng trước khi Đặt hàng.</p>
          </div>

          <div className="row">
            {/* Cart Information */}
            <div className="col-lg-4 col-md-6 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Giỏ hàng</span>
                <span className="badge badge-secondary badge-pill">{cartItems.length}</span>
              </h4>
              <ul className="list-group mb-3">
                {cartItems.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between lh-condensed align-items-center">
                    <div className="d-flex align-items-center">
                      <img src={item.thumbnail} className="img-fluid rounded me-3" alt={item.name} style={{ width: '50px' }} />
                      <div>
                        <h6 className="my-0">{item.name}</h6>
                        <small className="text-muted">{formatCurrency(item.price)} x {item.qty}</small>
                      </div>
                    </div>
                    <span className="text-muted">{formatCurrency(item.price * item.qty)}</span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Tổng thành tiền</span>
                  <strong>{formatCurrency(totalPrice)}</strong>
                </li>
              </ul>

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mã khuyến mãi"
                  value={promoCode}
                  onChange={handlePromoCodeChange}
                />
                <div className="input-group-append">
                  <button type="button" style={{marginLeft:"10px"}} className="btn bg-warning btn-lg btn-block">Áp dụng</button>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="col-lg-8 col-md-6 order-md-1">
              <h4 className="mb-3">Thông tin khách hàng</h4>
              <div className="row">
                <div className="col-12 mb-3">
                  <label htmlFor="kh_ten"><h6>Họ tên</h6></label>
                  <input type="text" className="form-control" id="kh_ten" />
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="kh_diachi"><h6>Địa chỉ</h6></label>
                  <input type="text" className="form-control" id="kh_diachi" />
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="kh_dienthoai"><h6>Điện thoại</h6></label>
                  <input type="text" className="form-control" id="kh_dienthoai" maxLength={10}/>
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="kh_email"><h6>Email</h6></label>
                  <input type="email" className="form-control" id="kh_email" />
                </div>
              </div>

              <h4 className="mb-3">Hình thức thanh toán</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="httt-1"
                    name="httt_ma"
                    type="radio"
                    className="custom-control-input"
                    value="1"
                    checked={paymentMethod === '1'}
                    onChange={handlePaymentMethodChange}
                    required
                  />
                  <label className="custom-control-label" htmlFor="httt-1">Tiền mặt</label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="httt-2"
                    name="httt_ma"
                    type="radio"
                    className="custom-control-input"
                    value="2"
                    checked={paymentMethod === '2'}
                    onChange={handlePaymentMethodChange}
                    required
                  />
                  <label className="custom-control-label" htmlFor="httt-2">Chuyển khoản</label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="httt-3"
                    name="httt_ma"
                    type="radio"
                    className="custom-control-input"
                    value="3"
                    checked={paymentMethod === '3'}
                    onChange={handlePaymentMethodChange}
                    required
                  />
                  <label className="custom-control-label" htmlFor="httt-3">Ship COD</label>
                </div>
              </div>
              <hr className="mb-4" />
              <button className="btn bg-warning btn-lg btn-block" type="submit">Đặt hàng</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Payment;
