import React from 'react';
import { NavLink } from 'react-router-dom';
import './SingleOrder.css';
// import Stripecc from '../components/stripe';

const SingleOrder = (props) => { 
    const {id, userId, datePlaced, status} = props.order;

return <>
    <div id={`order${id}`} className="orderCardData">
        <h3 className="userId">CustomerName: {userId}</h3>
        <div className="datePlaced">Date of order: {datePlaced}</div>
        <div className="status">Status: {status}</div>
          {/* <Stripecc to="/checkout" className="ordersButton"/> */}

        {
        id
        ?
        <NavLink to={`/orders${id}`} className="ordersButton">
            <button className="detailsButton">Details</button>
        </NavLink>
        :
        <span className="noOrderText">No order found {id}</span>
        }
    </div>
</>
}
export default SingleOrder;
