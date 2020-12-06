import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {getOrdersCart} from '../api';
import './Cart.css';

const Cart = (props) => {
    const {token, user} = props
    const [cart, setCart] = useState([]);
    const [updateCart, setUpdateCart]= useState('');
    const {username} = user

    useEffect(() => {
        getOrdersCart(token).then(cart=> {
        const cartProductData = cart.orderProducts.map((orderProduct)=>{           
            const product = () =>{ for(let i=0; i<cart.products.length; i++){
                if(cart.products[i].id===orderProduct.productId){
                    const product = cart.products[i]
                    return {product, price: orderProduct.price, quantity: orderProduct.quantity}
                }
            }}
            return product()
        })
        setCart(cartProductData)})
    }, [updateCart])

    console.log('CARTPRODUCTDATA', cart)

return <>
    <div className="cartDiv">
        <div className="cartItems">
        <h3 className="userId">{username}'s Cart</h3>
        {
            cart.map((product)=>{
                return<div>
                    
                </div>
            })
        }
        </div>
    </div>
</>
}

export default Cart;