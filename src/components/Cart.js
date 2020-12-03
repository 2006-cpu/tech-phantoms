import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {getOrdersCart} from '../api';
import SingleOrder from './SingleOrder';
import './Cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        getOrdersCart().then(singleOrder => setCart(singleOrder))
    }, [])

return <>
    <div className="cartDiv">
        <div className="cartItems">
            <SingleOrder order = {cart}/>
        </div>
    </div>
</>
}

export default Cart;