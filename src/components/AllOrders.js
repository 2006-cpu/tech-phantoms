import React, {useState, useEffect} from 'react';
import SingleOrder from './SingleOrder.js';
import getAllOrders from '../api';
import './AllOrders.css'

const AllOrders = (props) => {
    const {token} = props
    const [allOrders, setAllOrders] = useState([]);

    const fetchOrders =() => {
        getAllOrders(token)
          .then( responseAllOrders => {
            setAllOrders(responseAllOrders)
          console.log('responseAllOrders: ', responseAllOrders);
          })
      }

      useEffect (() => {
          fetchOrders();
      }, [])

    return <>
        <div className="allOrders">
            {
            allOrders.map((order) => <SingleOrder key={order.id} 
            order={order} />)
            }
        </div>
    </>
}

export default AllOrders;