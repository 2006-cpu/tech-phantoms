import React, {useEffect} from 'react'
import { completeOrder, getOrdersCart } from '../api';
import './Success.css';
import thankyou from './images/thankyou.jpg';

const Success = (props) =>{
    const {token} = props
    
    useEffect(()=>{
        const cart = getOrdersCart(token).then(response=>{completeOrder(token, response.id)})
        console.log('SUCCESS', cart)
    },[])
    
    return <div>
    <div className="success">
        <div>
        <h1>We Hope You Shop with Us Again!!</h1>
        </div>
    </div>
    <div>
        <img src={thankyou} alt="thankyou" className="success" width="100%" height="150%"></img>
    </div>
</div>
}

export default Success