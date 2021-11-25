import shopActionTypes from './shop.type';

export const updateCollections = (collections) => ({
    type: shopActionTypes.UPDATE_COLLECTIONS,
    payload: collections
})