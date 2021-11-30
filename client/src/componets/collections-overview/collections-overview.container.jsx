import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionsFetching } from '../../redux/shop/shop.reselect';
import WithSpinner from '../with-spinner/with-spinner.componet';
import CollectionsOverview from './collections-overview.compoent';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsFetching
});

//const CollectionOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));
const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview); // same thing as the above

export default CollectionOverviewContainer;