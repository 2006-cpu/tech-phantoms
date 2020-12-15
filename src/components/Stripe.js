import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from 'react-router-dom'

const PKSECRET = process.env.NODE_ENV === 'production'
  ? 'pk_test_51Ht0x3E3GFmNRfP2y3zQEwL39Agff3XwI80izmf3M8Uy4LNsLTFQf04FDw6dwomXIp9RqHG9slWonTc5xJIO5jQp001IQpFHC6'
  : 'pk_test_51Ht0x3E3GFmNRfP2y3zQEwL39Agff3XwI80izmf3M8Uy4LNsLTFQf04FDw6dwomXIp9RqHG9slWonTc5xJIO5jQp001IQpFHC6';

const PAYMENT_SERVER_URL = process.env.NODE_ENV;
 
const CURRENCY = 'USD';

const centsToDollar = amount => amount * 100;
 
const Stripecc = ({ description, amount }) =>{

  const history = useHistory();

  const successPayment = () => {  
  };

  const errorPayment = () => {
    history.push('/Success')
  };

    const onToken = (amount, description) => token =>{
      axios.post(PAYMENT_SERVER_URL,
        {
          description,
          source: token.id,
          currency: CURRENCY,
          amount: centsToDollar(amount)
        })
        .then(successPayment)
        .catch(errorPayment);}

  return <StripeCheckout
    name="Dope Soap" 
    description="Enter Payment Info Below" 
    image="https://i.imgur.com/SPml8u7.png" 
    amount={centsToDollar(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={PKSECRET}
    shippingAddress
    billingAddress
  />
}
export default Stripecc;