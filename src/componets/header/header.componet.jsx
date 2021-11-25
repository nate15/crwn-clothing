import React from 'react';


import './header.styles.scss';
import { HeaderContainer, LogoContainer, OptionContainer, OptionLink, OptionDiv} from './header.styles';

import {ReactComponent as Logo } from '../../assets/crown.svg.svg';
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.componet';
import CartDropdown from '../cart-dropdown/cart-dropdown-componet';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user-reselect';
import {selectCartHidden} from '../../redux/cart/cart-reselect';





const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="logo" />
        </LogoContainer>
        <OptionContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>
            <OptionLink>
                CONTACT 
            </OptionLink>
            {
            currentUser ?
            (<OptionDiv onClick={() => auth.signOut()}>
                SIGN OUT
            </OptionDiv>)
            :
            (<OptionLink className="option" to="/signin">
                SIGN IN
            </OptionLink>)
            }
            <CartIcon />
        </OptionContainer>
        {
            hidden ? null: ( <CartDropdown />)
        }
    </HeaderContainer>
);



const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);