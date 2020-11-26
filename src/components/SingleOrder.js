import React, { useState, useEffect } from 'react';
import './SingleOrder.css';
import {getSingleOrder} from '../api'

const SingleOrder = () => {
    const [order,setOrder]=useState([])

    useEffect(()=>{
        getSingleOrder().then(singleOrder=>setOrder(singleOrder))
    },[])

const {id, userId, datePlaced, productId, orderId, quantity, status, price} = order

return <>
    <div id={`singleOrder${id}`} className="singleOrderCard">
        <div className="orderCardData">
            <h3 className="userId">CustomerName: {userId}</h3>
            <div className="datePlaced">Date of order: {datePlaced}</div>
            <div className="productId">Product Id: {productId}</div>
            <div className="orderId">Order Id: {orderId}</div>
            <div className="quantity">Quantity: {quantity}</div>
            <div className="status">Status: {status}</div>
            <h5 className="price">Price: {price}</h5>

        </div>
    </div>

</>
}

export default SingleOrder;
