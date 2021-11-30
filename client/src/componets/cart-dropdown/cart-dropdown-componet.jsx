import React from 'react';

import './cart-dropdown.styles.scss';

import CartItem from '../cart-item/cart-item.componet';
import CustomButton from '../custome-button/custome-button.componet';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartItem} from '../../redux/cart/cart-reselect';
import { withRouter } from 'react-router';
import { toggleCartHidden } from '../../redux/cart/cart-actions';

const CartDropdown = ({cartItems ,history, dispatch}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            { cartItems.length?
                (cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={ cartItem } />
                ))) :
                <span className='empty-message'>Your cart is empty</span>
            }   
        </div>
        <CustomButton 
            onClick={() => {
                history.push('/checkout');
                dispatch((toggleCartHidden()));
                }
            }>
            Go to Checkout
        </CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItem
})

export default withRouter(connect(mapStateToProps)(CartDropdown));

