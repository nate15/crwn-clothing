import {createSelector} from 'reselect';

const shop = state => state.shop;


export const selectCollections = createSelector(
    [shop],
    shop => shop.collections
);

// converting object to array
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        collections => 
           collections? collections[collectionUrlParam] : null         
)