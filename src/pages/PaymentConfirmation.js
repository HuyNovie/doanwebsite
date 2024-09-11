import React from 'react'
import { Link } from 'react-router-dom'
import { useShoppingContext } from '../contexts/ShoppingContext'
import { formatCurrency } from '../helpers/common'

const PaymentConfirmation = () => {
  const { totalPrice, clearCart } = useShoppingContext()

  clearCart()

  return (
    <div className="container" style={{ padding: "5% 8%" }}>
      <h3 className="text-center">Xác nhận thanh toán</h3>
      <div className="text-center mt-4">
        <p>Cảm ơn bạn đã đặt hàng!</p>
        <p>Đơn hàng của bạn đã được xác nhận và chúng tôi sẽ liên hệ với bạn sớm nhất có thể.</p>
        <p><strong>Tổng tiền:</strong> {formatCurrency(totalPrice)}</p>
        <Link to="/menu" className="btn btn-primary">Quay lại trang menu</Link>
      </div>
    </div>
  )
}

export default PaymentConfirmation
