import React from 'react';
import './SingleOrder.css';

const SingleOrder = (props) => {
    const {id, userId, datePlaced, productId, orderId, quantity, status, price, } = props.singleOrder;

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
