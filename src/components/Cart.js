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
        <h2 className="userId">{username}'s Cart</h2>
        {
            cart.map((cartProduct)=>{
                const {product, price, quantity} = cartProduct
                return<div className = 'cartProduct'>
                    <img src={product.imageURL} className='productImage'></img>
                    <h3>{product.name}</h3>
                    <span>Quantity:{quantity}</span>
                    <span>Price: {price}</span>
                </div>
            })
        }
        </div>
    </div>
</>
}

export default Cart;