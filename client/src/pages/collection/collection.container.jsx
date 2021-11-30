import {connect} from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector} from 'reselect';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.reselect';
import WithSpinner from '../../componets/with-spinner/with-spinner.componet';
import CollectionPage from './collection.componet';


const mapStateToProps = createStructuredSelector({
    isLoading: state=> !selectIsCollectionsLoaded(state)
});

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;