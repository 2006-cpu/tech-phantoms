import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Stripecc extends React.Component{
    constructor(prop){
        super(prop);

        this.thanks=this.thanks.bind(this);
    }

    thanks(token){
        console.log(token);
    }



render(){
    return(
        
    //   <StripeCheckout
    //     token={this.token}
    //     stripeKey = "pk_test_51HswdxHuqx5U03uj4yQViOm0ih4DJOewXkXfCyeDjD2fLt9SITtRVX1xEox1lOFzJNfQGdtxmBZb5QQ15ym68xzw009QQu1e9j"
    //     billingAddress
    //     amount
    //     currency="USD" />
// ***************************************************************************************************************************************
<StripeCheckout
  name="Dope Soap" // the pop-in header title
  description="Enter Payment Info Below" // the pop-in header subtitle
  image="https://i.imgur.com/SPml8u7.png" // the pop-in header image (default none)
  ComponentClass="div"
  label="Complete Order" // text inside the Stripe button
  panelLabel="Pay Order" // prepended to the amount in the bottom pay button
  amount={1000000} // cents
  currency="USD"
  stripeKey = "pk_test_51HswdxHuqx5U03uj4yQViOm0ih4DJOewXkXfCyeDjD2fLt9SITtRVX1xEox1lOFzJNfQGdtxmBZb5QQ15ym68xzw009QQu1e9j"
  locale="US"
  email="theboss@dopesoap.com"
  // Note: Enabling either address option will give the user the ability to
  // fill out both. Addresses are sent as a second parameter in the token callback.
  shippingAddress
  billingAddress
  // Note: enabling both zipCode checks and billing or shipping address will
  // cause zipCheck to be pulled from billing address (set to shipping if none provided).
  zipCode={false}
//   alipay // accept Alipay (default false)
//   bitcoin // accept Bitcoins (default false)
//   allowRememberMe // "Remember Me" option (default true)
//   token={this.token} // submit callback
//   opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
//   closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
//   // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
//   // you are using multiple stripe keys
//   reconfigureOnUpdate={false}
//   // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
//   // useful if you're using React-Tap-Event-Plugin
//   triggerEvent="onTouchTap"
  >
  {/* <button className="btn btn-primary">
    Use your own child component, which gets wrapped in whatever
    component you pass into as "ComponentClass" (defaults to span)
  </button> */}
</StripeCheckout>

    );
   };
};
export default Stripecc;


// ******************************************************************************

// import React from 'react';
// import {loadStripe} from '@stripe/stripe-js';
// import {CardElement, Elements, ElementsConsumer} from '../../src';
// import '../styles/common.css';

// class CheckoutForm extends React.Component {
//   handleSubmit = async (event) => {
//     // Block native form submission.
//     event.preventDefault();

//     const {stripe, elements} = this.props;

//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded.
//       return;
//     }

//     // Get a reference to a mounted CardElement. Elements knows how
//     // to find your CardElement because there can only ever be one of
//     // each type of element.
//     const cardElement = elements.getElement(CardElement);

//     const {error, paymentMethod} = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (error) {
//       console.log('[error]', error);
//     } else {
//       console.log('[PaymentMethod]', paymentMethod);
//     }
//   };

//   render() {
//     const {stripe} = this.props;
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: '16px',
//                 color: '#424770',
//                 '::placeholder': {
//                   color: '#aab7c4',
//                 },
//               },
//               invalid: {
//                 color: '#9e2146',
//               },
//             },
//           }}
//         />
//         <button type="submit" disabled={!stripe}>
//           Pay
//         </button>
//       </form>
//     );
//   }
// }

// const InjectedCheckoutForm = () => {
//   return (
//     <ElementsConsumer>
//       {({elements, stripe}) => (
//         <CheckoutForm elements={elements} stripe={stripe} />
//       )}
//     </ElementsConsumer>
//   );
// };

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_51HswdxHuqx5U03uj4yQViOm0ih4DJOewXkXfCyeDjD2fLt9SITtRVX1xEox1lOFzJNfQGdtxmBZb5QQ15ym68xzw009QQu1e9j');

// const App = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <InjectedCheckoutForm />
//     </Elements>
//   );
// };

// export default App;


// ************************************************************************************************************************************