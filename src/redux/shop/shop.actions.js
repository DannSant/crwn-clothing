import ShopActionTypes from './shop.types';
import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = ()=>({
    type:ShopActionTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = (collectionsMap)=>({
    type:ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload:collectionsMap
})

export const fetchCollectionsError = (errorMessage)=>({
    type:ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload:errorMessage
})


export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionref = firestore.collection('collections');
        dispatch(fetchCollectionsStart());
         collectionref.onSnapshot(async snapshot =>{           
             const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
             dispatch(fetchCollectionsSuccess(collectionsMap))
            
        },error=>{
            dispatch(fetchCollectionsError(error.message))
        })
    }
}