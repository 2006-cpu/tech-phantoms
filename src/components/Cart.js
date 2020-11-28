import React, { useState, useEffect } from 'react';
import {getOrdersCart} from '../api';
import './Cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getOrdersCart().then(singleOrder => setCart(singleOrder))
    }, [])

    const {imageURL, id, userId, datePlaced, productId, orderId, quantity, status, price} = cart;

return <>
    <div id={`singleOrder${id}`} className="cartView">
        <div className="cartItems">
            <img src={imageURL} alt="soap" width="30px" height="30px" />
            <h3 className="userId">CustomerName: {userId}</h3>
            <div className="datePlaced">Date of order: {datePlaced}</div>
            <div className="productId">Product Id: {productId}</div>
            <div className="orderId">Order Id: {orderId}</div>
            <div className="quantity">Quantity: {quantity}</div>
            <div className="status">Status: {status}</div>
            <h5 className="price">Price: {price}</h5>
            <button className="placeOrder" onClick={setCart}>Place order</button>
        </div>
    </div>    
</>
}

export default Cart;