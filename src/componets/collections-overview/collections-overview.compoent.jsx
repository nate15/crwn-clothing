import React from 'react';

import './collections-overview.styles.scss';

import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.reselect';
import CollectionPreview from '../collection-preview/collection-preview.componet';

const CollectionsOverview = ({collections}) => (
    <div className='collections-overview'>
        {
            collections.map(({id, ...otherShopCollections}) => (
                <CollectionPreview key={id} {...otherShopCollections}/>
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);

