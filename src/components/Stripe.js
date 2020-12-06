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
        
      <StripeCheckout
        token={this.token}
        stripeKey = "pk_test_51HswdxHuqx5U03uj4yQViOm0ih4DJOewXkXfCyeDjD2fLt9SITtRVX1xEox1lOFzJNfQGdtxmBZb5QQ15ym68xzw009QQu1e9j"
        billingAddress
        amount
        currency="USD" />
    );
   };
};
export default Stripecc;