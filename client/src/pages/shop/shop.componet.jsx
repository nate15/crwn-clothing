import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

import './shop.styles.scss';


import {connect} from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import Spinner from "../../componets/spinner/spinner.componet";

const CollectionsOverviewContainer = lazy(() => 
    import('../../componets/collections-overview/collections-overview.container'));
const CollectionPageContainer = lazy(() => 
    import('../collection/collection.container'));

class ShopPage extends React.Component {

    unsubscribeFromSnapshot = null;
    
    componentDidMount = () =>{
      const { fetchCollectionsStartAsync } = this.props;
      fetchCollectionsStartAsync();
    }

    render(){
        const { match } = this.props;
        return(
            <div className="shop-page">
                <Suspense fallback={ <Spinner />}>
                    <Route 
                        exact 
                        path={`${match.path}`} 
                        component={CollectionsOverviewContainer} />
                    <Route  
                        path={`${match.path}/:categoryId`} 
                        component={CollectionPageContainer} />
                </Suspense>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});  

export default connect(
    null, 
    mapDispatchToProps
    )(ShopPage);

