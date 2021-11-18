import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.componet';
import ShopPage from './pages/shop/shop.componet';
import Header from './componets/header/header.componet';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.componet';
import CheckoutPage from './pages/checkout/checkout.compoent';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectCurrentUser} from './redux/user/user-reselect'




class App extends React.Component {
  
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if(userAuth){
          const userRef =await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
            setCurrentUser({
              currentUser :{
                id: snapShot.id,
                ...snapShot.data()
              }}
            );
          });

        }else{
          this.setState({currentUser: userAuth});
        }

      }
    );
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    const {currentUser} = this.props;

    return( 
    <div> 
      <Header/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route 
          exact 
          path="/signin" 
          render={() => 
            currentUser ? (
            <Redirect to='/' />
            ) : (
            <SignInAndSignUp />
            )
          } 
        />
      </Switch>
    </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
