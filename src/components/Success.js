import React, {useEffect} from 'react'
import { completeOrder, getOrdersCart } from '../api';
import './Success.css';
import bubble02 from './images/bubble02.png';

const Success = (props) =>{
    const {token} = props
    
    useEffect(()=>{
        const cart = getOrdersCart(token).then(response=>{completeOrder(token, response.id)})
        console.log('SUCCESS', cart)
    },[])
    
    return <div>
    <div className="welcomeDiv">

        <div className="bubbleSetOneOne">
            <img src={bubble02} className="bubbleOneOne" alt="bubbleOne" width="100px" height="100px" />
            <img src={bubble02} className="bubbleTwoTwo" alt="bubbleTwo" width="150px" height="150px" />
        </div> 

        <div><br /><br/>
        <h1>Thank you for your Order!</h1></div>

        <div className="bubbleSetTwoTwo">
            <img src={bubble02} className="bubbleThreeThree" alt="bubbleThree" width="300px" height="300px" />
        </div> 

    </div>

</div>
    
    
    
    // <h1 className="success">Thank you for your Order!</h1>
}

export default Success