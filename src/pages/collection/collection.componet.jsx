import React from 'react';

import './collection.styles.scss';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.reselect';
import CollectionItem from '../../componets/collection-item/collection-item.componet';

const CollectionPage = ({collection}) => {
    console.log(collection);
    const {title, items} = collection;
 
    return(
        <div className='collection-page'>
            <h2 className='title'> { title }</h2>
            <div className='items'>
                {items.map( item =>  
                    <CollectionItem key={ item.id } item={ item }  />   
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.categoryId)(state)
})

export default connect(mapStateToProps)(CollectionPage);