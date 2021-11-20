import SHOP_DATA from './shop.data';

const INITAL_STATE = {
    collections: SHOP_DATA
}

const shopReducer = (state = INITAL_STATE, action) => {
    switch (state.action) {
        default:
            return state;
    }
}

export default shopReducer;