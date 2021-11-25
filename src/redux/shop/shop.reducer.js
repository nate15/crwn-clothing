import SHOP_DATA from './shop.data';

import shopActionTypes from './shop.type';

const INITAL_STATE = {
    collections: null
}


const shopReducer = (state = INITAL_STATE, action) => {
    switch (action.type) {
        case shopActionTypes.UPDATE_COLLECTIONS:
            return {
                collections: action.payload
            }
        default:
            return state;
    }
}

export default shopReducer;