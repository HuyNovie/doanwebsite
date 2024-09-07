
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShoppingContext } from '../contexts/ShoppingContext'
import { formatCurrency } from '../helpers/common'
import { FaRegTrashAlt } from "react-icons/fa"



const Checkout = () => {
    const navigate = useNavigate()
    const { cartItems, totalPrice, increaseQty, decreaseQty, removeCartItem, clearCart } = useShoppingContext()

  return (
    <div className="row" style={{padding:"2% 8%",marginRight: 0}}>
    <h3>Giỏ hàng</h3>
    <table className="table table-hover">
        <thead>
            <tr style={{textAlign:"center"}}>
                <th>Hình ảnh</th>
                <th>Tên món</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {cartItems.map(item => {
                return (
                    <tr key={item.id} style={{verticalAlign: "middle",textAlign:"center"}} >
                        <td><img src={item.thumbnail} className='img-fluid rounded' alt={item.name} /></td>
                        <td style={{width: "200px",wordWrap:"break-word"}}>{item.name}</td>
                        <td>{formatCurrency(item.price)}</td>
                        <td style={{width: "200px",wordWrap:"break-word"}}>
                            <button type="button" className="btn btn-sm btn-secondary " onClick={() => decreaseQty(item.id)}><strong>-</strong></button>
                            <span className="px-3">{item.qty}</span>
                            <button type="button" className="btn btn-sm btn-secondary " onClick={() => increaseQty(item.id)}><strong>+</strong></button>
                        </td>
                        <td style={{width: "200px"}}>{formatCurrency(item.price * item.qty)}</td>
                        <td>
                            <button className="btn btn-sm btn-danger btn-remove" onClick={() => removeCartItem(item.id)}>
                                <FaRegTrashAlt />
                            </button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
    <div className='col-md-12'>
        <span className='float-end me-2 '><strong>Tổng tiền:</strong><strong className='text-danger px-3 '>{formatCurrency(totalPrice)}</strong></span>
        
    </div>
    <div className='col-md-12 mt-5'>
        <Link to='/menu' className='btn btn-sm btn-primary float-start'>Tiếp tục mua </Link>
        <button className='btn btn-sm btn-success float-end me-2 d-block' onClick={() => {
            clearCart()
            navigate('/menu')
        }}>Thanh toán</button>
    </div>
</div>
  )
}

export default Checkout
