import React, { useState, useEffect } from 'react';
import {getOrdersCart, removeProductFromCart, completeOrder} from '../api';
import './Cart.css';
import Stripecc from './Stripe';
import { centsToDollars } from './helpers'

const Cart = (props) => {
    const {token, user} = props
    const [cart, setCart] = useState([]);
    const [orderId, setOrderId] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [updateCart, setUpdateCart]= useState('');
    const {username} = user
 
    useEffect(() => {
        getOrdersCart(token).then( cart=> {
            if(cart.orderProducts){
        const cartProductData = cart.orderProducts.map((orderProduct)=>{           
            const product = () =>{ for(let i=0; i<cart.products.length; i++){
                if(cart.products[i].id===orderProduct.productId){
                    const product = cart.products[i]
                    return {product, price: orderProduct.price, quantity: orderProduct.quantity}
                }
            }}
            return product()
        })
        setCart(cartProductData)
            let total = 0
            for(let i=0;i<cartProductData.length;i++){
                total=total+cartProductData[i].price
            }
        setTotalPrice(total)
        setOrderId(cart.id)
        }})
    }, [updateCart])

return <>
    <div className="cartDiv">
        <div className="cartItems">
        <h2 className="userId">{username}'s Cart</h2>
        {
            cart.map((cartProduct)=>{
                const {product, price, quantity} = cartProduct
                return<div key={'cartProduct'+product.id} className = 'cartProduct'>

                    <div className="cartItemsStyle">
                        <img src={product.imageURL} alt="productImage" className='productImage'></img>
                        <div className="cartItemText">
                            <h3>{product.name}</h3>
                            <span>Quantity: {quantity}</span>
                            <span>Price: ${centsToDollars(price)}</span>
                        </div>
                    </div>

                    <button className="cartRemoveButton" onClick={()=>{removeProductFromCart(orderId, product.id, token).then((removed)=>{setUpdateCart('Removed'+orderId+totalPrice+1)})}}>Remove</button>
                </div>
            })
        }
        <h3 className="cartTotalPrice">Total Price: ${centsToDollars(totalPrice)}</h3>
        <Stripecc />
        </div>
    </div>
</>
}

export default Cart;