import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useShoppingContext } from '../contexts/ShoppingContext';
import { formatCurrency } from '../helpers/common';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');
  const { cartItems, totalPrice } = useShoppingContext();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/users/my-info');
        setUserInfo(response.data.result);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const storedOrderData = localStorage.getItem('orderData');
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
    } else {
      setOrderData({
        userName: `${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`,
        totalAmount: totalPrice || 0,
        items: cartItems.map(item => ({
          productId: item.id || "",
          productName: item.productName || "Tên món không có",
          quantity: item.quantity || 0,
          unitPrice: item.unitPrice || 0,
          totalPrice: (item.unitPrice || 0) * (item.quantity || 0),
        })),
      });
    }

    fetchUserInfo();
  }, [cartItems, totalPrice, userInfo]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderRequest = {
        ...orderData,
        paymentMethod: paymentMethod,
        promoCode: promoCode,
      };

      const response = await api.post('/orders/create', orderRequest);
      if (response.data.code === 1000) {
        localStorage.removeItem('orderData');
        window.alert('Đặt hàng thành công!');
        window.location.href = '/'; 
      } else {
        setError('Có lỗi xảy ra khi tạo đơn hàng.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setError('Có lỗi xảy ra khi tạo đơn hàng.');
    }
  };

  return (
    <main role="main">
      <div className="container mt-4" style={{ paddingTop: '120px', paddingLeft: '50px', paddingRight: '50px' }}>
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
                      <img src={`http://localhost:8080/restaurant/images/${item.imageUrl}`} className="img-fluid rounded me-3" alt={item.productName} style={{ width: '50px' }} />
                      <div>
                        <h6 className="my-0">{item.productName}</h6>
                        <small className="text-muted">{formatCurrency(item.unitPrice)} x {item.quantity}</small>
                      </div>
                    </div>
                    <span className="text-muted">{formatCurrency(item.unitPrice * item.quantity)}</span>
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
                  <button type="button" style={{ marginLeft: '10px' }} className="btn bg-warning btn-lg btn-block">Áp dụng</button>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-6 order-md-1">
              <h4 className="mb-3">Thông tin khách hàng</h4>
              <div className="row">
                <div className="col-12 mb-3">
                  <label htmlFor="kh_ten"><h6>Họ tên</h6></label>
                  <input type="text" className="form-control" id="kh_ten" defaultValue={userInfo ? `${userInfo.firstName || ''} ${userInfo.lastName || ''}` : ''} />
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="kh_diachi"><h6>Địa chỉ</h6></label>
                  <input type="text" className="form-control" id="kh_diachi" defaultValue={userInfo?.address || ''} />
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="kh_dienthoai"><h6>Điện thoại</h6></label>
                  <input type="text" className="form-control" id="kh_dienthoai" maxLength={10} defaultValue={userInfo?.phone || ''} />
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="kh_email"><h6>Email</h6></label>
                  <input type="email" className="form-control" id="kh_email" defaultValue={userInfo?.mail || ''} />
                </div>
              </div>

              <h4 className="mb-3">Hình thức thanh toán</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="httt_1"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={handlePaymentMethodChange}
                  />
                  <label className="custom-control-label" htmlFor="httt_1">Thanh toán khi nhận hàng (COD)</label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="httt_2"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    value="BankTransfer"
                    checked={paymentMethod === 'BankTransfer'}
                    onChange={handlePaymentMethodChange}
                  />
                  <label className="custom-control-label" htmlFor="httt_2">Chuyển khoản ngân hàng</label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="httt_3"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    value="Online"
                    checked={paymentMethod === 'Online'}
                    onChange={handlePaymentMethodChange}
                  />
                  <label className="custom-control-label" htmlFor="httt_3">Thanh toán trực tuyến</label>
                </div>
              </div>
              <button className="btn btn-primary btn-lg btn-block" type="submit">Đặt hàng</button>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Payment;
