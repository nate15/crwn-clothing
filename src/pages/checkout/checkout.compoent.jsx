import React from 'react';

import './checkout.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItem } from '../../redux/cart/cart-reselect';
import { selectCartTotal } from '../../redux/cart/cart-reselect';
import CheckoutItem from '../../componets/checkout-item/checkout-item.componet'; 


const CheckoutPage = ({ cartItems, total }) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => 
                <CheckoutItem cartItem={cartItem} />
            )
        }
        <div className='total'>
            <span>Total: ${ total }</span>
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItem,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);