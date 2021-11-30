import ShopActionTypes from './shop.type';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = (error) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: error
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        
        const collectionRef = firestore.collection('collection');
        dispatch(fetchCollectionsStart());

        collectionRef
            .get()
            .then(snapshot =>{
                const collectionMap = convertCollectionSnapshotToMap(snapshot);
                dispatch(fetchCollectionsSuccess(collectionMap));
            })
            .catch(error => dispatch(fetchCollectionsFailure(error.message)))
            
    }
}