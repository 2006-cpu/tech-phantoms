import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {getOrdersCart} from '../api';
import SingleOrder from './SingleOrder';
import './Cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        getOrdersCart().then(singleOrder => setCart(singleOrder)).then(console.log("CART", cart))
    }, [])

return <>
    <div className="cartDiv">
        <div className="cartItems">
            
            {/* <NavLink to="/checkout" className="cartCheckout">Place Order</NavLink> */}
        </div>
    </div>
</>
}

export default Cart;