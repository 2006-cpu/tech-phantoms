import React, {useEffect} from 'react'
import { completeOrder, getOrdersCart } from '../api';

const Success = (props) =>{
    const {token} = props
    
    useEffect(()=>{
        const cart = getOrdersCart(token).then(response=>{completeOrder(token, response.id)})
        console.log('SUCCESS', cart)
    },[])
    
    return <h1>Thank you for your Order!</h1>
}

export default Success