import React, { useState, useEffect } from 'react';
import {getSingleOrder} from '../api';
import './SingleOrder.css';

const SingleOrder = () => {
    const [order,setOrder]=useState([])

    useEffect(()=>{
        getSingleOrder().then(singleOrder=>setOrder(singleOrder))
    },[])

const {imageURL, id, userId, datePlaced, productId, orderId, quantity, status, price} = order;

return <>
    <div id={`singleOrder${id}`} className="singleOrderDiv">
        <div className="orderCardData">
            <img src={imageURL} alt="soap" width="30px" height="30px" />
            <h3 className="userId">CustomerName: {userId}</h3>
            <div className="datePlaced">Date of order: {datePlaced}</div>
            <div className="productId">Product Id: {productId}</div>
            <div className="orderId">Order Id: {orderId}</div>
            <div className="quantity">Quantity: {quantity}</div>
            <div className="status">Status: {status}</div>
            <h5 className="price">Price: {price}</h5>
            <button className="addToCart" onClick={setOrder}>Add to cart</button>
        </div>
    </div>
</>
}

export default SingleOrder;
