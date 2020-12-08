import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {getOrdersCart, removeProductFromCart} from '../api';
import './Cart.css';
import axios from 'axios'
import { centsToDollars } from './helpers'

const Cart = (props) => {
    const {token, user} = props
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const [updateCart, setUpdateCart]= useState('');
    const {username} = user

    useEffect(() => {
        getOrdersCart(token).then( cart=> {
        const cartProductData = cart.orderProducts.map((orderProduct)=>{           
            const product = () =>{ for(let i=0; i<cart.products.length; i++){
                if(cart.products[i].id===orderProduct.productId){
                    const product = cart.products[i]
                    return {product, price: orderProduct.price, quantity: orderProduct.quantity}
                }
            }}
           
            return product()
        })
        const cartTotalData= {
            id:cart.id,
            products: cartProductData
        }
        setCart(cartTotalData)
            let total = 0
            for(let i=0;i<cartProductData.length;i++){
                total=total+cartProductData[i].price
            }
        setTotalPrice(total)
        })
    }, [updateCart])

    console.log('CARTPRODUCTDATA', cart)

return <>
    <div className="cartDiv">
        <div className="cartItems">
        <h2 className="userId">{username}'s Cart</h2>
        {   cart.products ?
            cart.products.map((cartProduct)=>{
                const {product, price, quantity} = cartProduct
                return<div key={'cartProduct'+product.id} className = 'cartProduct'>
                    <img src={product.imageURL} className='productImage'></img>
                    <h3>{product.name}</h3>
                    <span>Quantity:{quantity}</span>
                    <span>Price: ${centsToDollars(price)}</span>
                    <button onClick={()=>{removeProductFromCart(cart.id, product.id, token).then((removed)=>{setUpdateCart('Removed'+removed.name)})}}>Remove</button>
                </div>
            })
            :
            <div>Cart is Empty!</div>
        }
        <div>Total Price: ${centsToDollars(totalPrice)}</div>
        </div>
    </div>
</>
}

export default Cart;