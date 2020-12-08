import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';
import { getOrder } from '../api';
import './Order.css';

const Order = () => {
    const {orderId} = useParams()
    const [order, setOrder] = useState({});

    useEffect(() => {
        getOrder(orderId)
            .then( responseOrder => {
                setOrder(responseOrder)
            })
    }, []);
    const {id, userId, datePlaced, status} = order;

    if(order==='') {
        return <div>
            <h3 className="missingOrderText">No order found</h3>
        </div>
    } else {
return <>
    <h2 id={`singleOrder${id}`} className="SingleOrderCard">Your Order</h2>
    <div id={`userid${userId}`} className="userIdOrder">
        <div className="singleOrderData">
        <h3 className="datePlaced">{datePlaced}</h3>
        <h3 className="status">{status}</h3>
        </div>

        <NavLink to="/orders/orderId" className="orderLink">
        <button className="PlaceOrderButton">Place Order</button>
        </NavLink>

    </div>
    
</>
}
}
export default Order;