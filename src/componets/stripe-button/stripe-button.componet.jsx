import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const pubslishableKey = 'pk_test_51JyWA1JzRit1kxg3afSPacudx7FUpjFjf1fKo79EQjvWLtZhFTGcKkOV4YE74Y2d6YZqRnXTrt7Sh3WIiwd1tgZy000JidtDcl';
    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
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