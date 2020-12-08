import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Cart from './Cart';

const PKSECRET = process.env.NODE_ENV === 'production'
  ? 'pk_test_51Ht0x3E3GFmNRfP2y3zQEwL39Agff3XwI80izmf3M8Uy4LNsLTFQf04FDw6dwomXIp9RqHG9slWonTc5xJIO5jQp001IQpFHC6'
  : 'pk_test_51Ht0x3E3GFmNRfP2y3zQEwL39Agff3XwI80izmf3M8Uy4LNsLTFQf04FDw6dwomXIp9RqHG9slWonTc5xJIO5jQp001IQpFHC6';


export default class Stripecc extends React.Component{
    constructor(prop){
        super(prop);

        this.thanks=this.thanks.bind(this);
    }

    thanks(token){
        console.log(token);
    }




render(){
    return(

<StripeCheckout
  name="Dope Soap" 
  description="Enter Payment Info Below" 
  image="https://i.imgur.com/SPml8u7.png" 
  ComponentClass="div"
  label="Pay Order" 
  panelLabel="Pay Order"  
  currency="USD"
  amount
  stripeKey= {PKSECRET} 
  locale="en"
  email="theboss@dopesoap.com"
  shippingAddress
  billingAddress
  zipCode={false}
  token={this.token} 
  />
  )
   }
}