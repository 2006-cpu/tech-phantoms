import React, { useEffect, useState } from 'react';
import './SingleOrder.css';
import { centsToDollars } from './helpers'

const SingleOrder = (props) => { 
    const {id, userId, datePlaced, status, orderProducts, products} = props.order;
    const [productObjects, setProductObjects] = useState([])
    useEffect(()=>{
        if(orderProducts){
        const productData = orderProducts.map((orderProduct)=>{           
            const product = () =>{ for(let i=0; i<products.length; i++){
                if(products[i].id===orderProduct.productId){
                    const product = products[i]
                    return {product, price: orderProduct.price, quantity: orderProduct.quantity}
                }
            }}
            return product()
        })
        setProductObjects(productData)}
    },[])
return <>
    <div id={`order${id}`} className="orderCardData">
        <h3 className="userIdOrderNumber">Order# {userId}</h3>
        <div className="dateOrderPlaced">Date of order: {datePlaced}</div>
        <div className="orderStatus">Status: {status}</div>
          <div to="/checkout" className="ordersButton"/>
        {
            productObjects ?
            productObjects.map((cartProduct)=>{
                const {product, price, quantity} = cartProduct
                return<div key={'cartProduct'+product.id} className = 'cartProduct'>
                    <img src={product.imageURL} className='productImage'></img>
                    <h3>{product.name}</h3>
                    <span>Quantity:{quantity}</span>
                    <span>Price: ${centsToDollars(price)}</span>
                </div>
            })
            :
            <div>No products in order.</div>
        }
  
    </div>
</>
}
export default SingleOrder;
