import React from "react";
import { Route } from "react-router-dom";

import './shop.styles.scss';

import CollectionsOverview from '../../componets/collections-overview/collections-overview.compoent'
import CollectionPage from "../collection/collection.componet";
import {firestore,
    convertCollectionSnapshotToMap
} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.actions';
import WithSpinner from "../../componets/with-spinner/with-spinner.componet";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;
    
    componentDidMount = () =>{
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collection');

        collectionRef.onSnapshot(async snapshot =>{
            const collectionMap = convertCollectionSnapshotToMap(snapshot);
            updateCollections(collectionMap);
            this.setState({ loading: false });
        })
    }

    render(){
        const {match} = this.props;
        const {loading} = this.state;
        return(
            <div className="shop-page">
                <Route 
                    exact 
                    path={`${match.path}`} 
                    render={props => 
                        <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>} />
                <Route  
                    path={`${match.path}/:categoryId`} 
                    render={props => 
                        <CollectionPageWithSpinner isLoading={loading} {...props}/> } />

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => 
        dispatch(updateCollections(collectionMap))
});  

export default connect(null, mapDispatchToProps)(ShopPage);

