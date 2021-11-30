import React from 'react';

import './App.css';

import {Switch,Route,Redirect} from 'react-router-dom';
import {auth, createUserProfileDocument, addCollectionAndDocuments} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectCurrentUser} from './redux/user/user-reselect';
import { selectCollectionsForPreview } from './redux/shop/shop.reselect';



import HomePage from './pages/homepage/homepage.componet';
import ShopPage from './pages/shop/shop.componet';
import Header from './componets/header/header.componet';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.componet';
import CheckoutPage from './pages/checkout/checkout.compoent';





class App extends React.Component {
  
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser, collectionArray } = this.props;

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

   // addCollectionAndDocuments('collection',collectionArray.map(({title, items}) => ({title, items})));
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
        <Route path="/shop" component={ShopPage} />
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
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
