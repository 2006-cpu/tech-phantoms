import React from 'react';
import './SingleOrder.css';
import Stripecc from '../components/Stripe';

const SingleOrder = (props) => {
    const {order} = props;
    const {id, userId, datePlaced, status} = order;

return <>
    <div className="orderCardData">
        <h3 className="userId">CustomerName: {userId}</h3>
        <div className="datePlaced">Date of order: {datePlaced}</div>
        <div className="orderId">Order number: {id}</div>
        <div className="status">Status: {status}</div>
          <Stripecc to="/checkout" className="ordersButton"/>
    </div>
</>
}

export default SingleOrder;
