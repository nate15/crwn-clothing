import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const pubslishableKey = 'pk_test_51JyWA1JzRit1kxg3afSPacudx7FUpjFjf1fKo79EQjvWLtZhFTGcKkOV4YE74Y2d6YZqRnXTrt7Sh3WIiwd1tgZy000JidtDcl';
    
    const onToken = token => {
        axios({
          url: 'payment',
          method: 'post',
          data: {
            amount: priceForStripe,
            token: token
          }
        })
          .then(response => {
            alert('succesful payment');
          })
          .catch(error => {
            console.log('Payment Error: ', error);
            alert(
              'There was an issue with your payment! Please make sure you use the provided credit card.'
            );
          });
    };

    return (
        <StripeCheckout
            name='Crwn Clothing PLC'
            label='Pay Now'
            billingAddress
            shippingAddress
            image='http://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={pubslishableKey}
            
        />
    )
}

export default StripeCheckoutButton;