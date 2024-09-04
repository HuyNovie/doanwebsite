
import React from 'react'
import "./CartItems.css"
import { FaRegTrashAlt } from "react-icons/fa"
import { useShoppingContext } from '../../contexts/ShoppingContext'
import { formatCurrency } from '../../helpers/common'

const CartItems = ({ id, name, price, qty, thumbnail }) => {

  const {increaseQty,decreaseQty,removeCartItem} =useShoppingContext()
  return (
    <>
                <tr> 
                    <td className="center-td" style={{width: "80px"}} >
                      <img src={thumbnail} className="img-fluid rounded" alt="Product1" />
                    </td>
                    <td className="center-td" style={{width: "150px"}} ><span>{name}</span></td>
                    <td className="center-td" >
                    <div className="quantity-controls">
                    <span className="item-quantity">{formatCurrency(price)}x{qty}</span>
                    </div>
                    </td>
                    <td className="center-td" style={{width: "90px"}} >
                      <button type="button" className="btn btn-sm btn-secondary ms-1"onClick={() => decreaseQty(id)}><strong>-</strong></button>
                      <button type="button" className="btn btn-sm btn-secondary ms-1"onClick={() => increaseQty(id)}><strong>+</strong></button>
                    </td>
                 
                    <td className="center-td">
                      <span className="item-price text-danger px-2 ">{formatCurrency(qty*price)} </span>
                    </td>
                    <td className="center-td">
                      <button className="btn btn-sm btn-danger btn-remove" onClick={() => removeCartItem(id)}><FaRegTrashAlt /></button>
                    </td>
                  </tr>

                  </>
  )
}

export default CartItems;
