import React, { lazy, Suspense } from 'react';

import './global.styles.scss';

import {Switch,Route,Redirect} from 'react-router-dom';
import {auth, createUserProfileDocument, addCollectionAndDocuments} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectCurrentUser} from './redux/user/user-reselect';
import { selectCollectionsForPreview } from './redux/shop/shop.reselect';

import Header from './componets/header/header.componet'
import Spinner from './componets/spinner/spinner.componet';
import ErrorBoundary from './componets/error-boundary/error-boundary.componet';

const HomePage = lazy(() => import('./pages/homepage/homepage.componet'));
const ShopPage = lazy(() => import('./pages/shop/shop.componet'));
const SignInAndSignUp = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.componet'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.compoent'));


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
        <ErrorBoundary>
          <Suspense fallback={ <Spinner />}>
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
          </Suspense>
        </ErrorBoundary>
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
