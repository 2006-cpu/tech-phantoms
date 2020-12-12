import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import completeOrder from '../api'
import {token, orderId} from './Cart'

const PKSECRET = process.env.NODE_ENV === 'production'
  ? 'pk_test_51Ht0x3E3GFmNRfP2y3zQEwL39Agff3XwI80izmf3M8Uy4LNsLTFQf04FDw6dwomXIp9RqHG9slWonTc5xJIO5jQp001IQpFHC6'
  : 'pk_test_51Ht0x3E3GFmNRfP2y3zQEwL39Agff3XwI80izmf3M8Uy4LNsLTFQf04FDw6dwomXIp9RqHG9slWonTc5xJIO5jQp001IQpFHC6';

class Stripecc extends React.Component{
render(){
    return<>
      <StripeCheckout
      name="Dope Soap" 
        description="Enter Payment Info Below" 
        image="https://i.imgur.com/SPml8u7.png" 
        panelLabel="Process Order"  
        currency="USD"
        amount
        stripeKey= {PKSECRET} 
        locale="en"
        email="theboss@dopesoap.com"
        shippingAddress
        billingAddress
        success_url='/allproducts'>{this.props.children}</StripeCheckout>
    </>
   }
}

export default Stripecc;