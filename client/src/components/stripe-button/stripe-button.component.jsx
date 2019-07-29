import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price})=>{
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_JkUJbJMw6s1cvCYU2A8iXiVQ00M6t1ZGL7';

    const onToken = token =>{
       
        axios({
            url:'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response=>{
            alert('Payment successful');
        }).catch(error =>{
            console.log('Payment error', JSON.parse(error));
            alert('There was an issue with your payment');
        })
    }

    return (
        <StripeCheckout 
            label="Pay Now"
            name='Crwn Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
            
        >

        </StripeCheckout>
    )

}

export default StripeCheckoutButton;