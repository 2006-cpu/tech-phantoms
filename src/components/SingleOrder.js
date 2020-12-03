import React from 'react';
import { NavLink } from 'react-router-dom';
import './SingleOrder.css';

const SingleOrder = (props) => {
    const {order} = props;
    const {id, userId, datePlaced, status} = order;

return <>
    <div className="orderCardData">
        <h3 className="userId">CustomerName: {userId}</h3>
        <div className="datePlaced">Date of order: {datePlaced}</div>
        <div className="orderId">Order number: {id}</div>
        <div className="status">Status: {status}</div>
          <NavLink to="/checkout" className="ordersButton">Place Order</NavLink>
    </div>
</>
}

export default SingleOrder;
