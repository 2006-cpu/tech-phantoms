import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

import {getUser, getProduct} from '../api';
import singleProduct from './singleProduct'
import SingleUser from './SingleUser';
import './Checkout.css';

const promise = loadStripe("pk_test_51HtIhYCIi2I46Z155ihImR2n4QTED66dUwhxEBjy6xbUeUpgqPmYSJPlFmeXY811Le6NqmRvY309pYfnRLnbCSej00Hq6Clv7h")

const Checkout = () => {
  

return <>
    <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>

</>

}

export default Checkout;




// 🔸🔸 https://www.youtube.com/watch?v=lkA4rmo7W6k

// 🔸 https://www.npmjs.com/package/react-stripe-checkout



