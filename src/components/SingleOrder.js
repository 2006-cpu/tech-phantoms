import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SingleOrder.css';
import Stripecc from '../components/Stripe';

const SingleOrder = (props) => { 
    const {id, userId, datePlaced, status, orderProducts, products} = props.order;
    const [productObjects, setProductObjects] = useState([])
    useEffect(()=>{
        const productData = orderProducts.map((orderProduct)=>{           
            const product = () =>{ for(let i=0; i<products.length; i++){
                if(products[i].id===orderProduct.productId){
                    const product = products[i]
                    return {product, price: orderProduct.price, quantity: orderProduct.quantity}
                }
            }}
            return product()
        })
        setProductObjects(productData)
    },[])
return <>
    <div id={`order${id}`} className="orderCardData">
        <h3 className="userId">CustomerName: {userId}</h3>
        <div className="datePlaced">Date of order: {datePlaced}</div>
        <div className="status">Status: {status}</div>
          <Stripecc to="/checkout" className="ordersButton"/>

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
