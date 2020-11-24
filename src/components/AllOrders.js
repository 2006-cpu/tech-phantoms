import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../api';
import SingleOrder from './SingleOrder.js';
import './AllOrders.css'

const AllOrders = (props) => {
    const {allOrders, setAllOrders} = props;
    useEffect (() => {
        getAllOrders()
            .then( response => {
            console.log('allOrders: ', response);
            setAllOrders(response)
            })
    }, []);

    return <>
        <div className="allOrders">
            {
            allOrders.map((singleOrder) => <SingleOrder key={singleOrder.cart} />)
            }
        </div>

    </>
}

export default AllOrders;