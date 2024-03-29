import {takeLatest, put,all,call} from 'redux-saga/effects';
import UserActionType from './user.types';
import {auth,googleProvider,createUserProfileDocument,getCurrentAuthUser} from '../../firebase/firebase.utils';

import {signInSuccess,signInFailure,signOutSuccess,signOutFailure,signUpSuccess,signUpFailure} from './user.actions';
import {clearCart} from '../cart/cart.actions';

export function* getSnapshotFromUserAuth(userAuth,additionalData){
    try {      
        const userRef = yield call(createUserProfileDocument,userAuth,additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id:userSnapshot.id,...userSnapshot.data()}))
    }catch(error){
        yield put(signInFailure(error))
    }
}

/*GOOGLE SIGN IN*/ 
export function* signInWithGoogle(){
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    }catch(error){
        yield put(signInFailure(error))
    }
}
export function* onGoogleSignInStart(){
    yield takeLatest(UserActionType.GOOGLE_SIGN_IN_START,signInWithGoogle)
}

/*EMAIL SIGN IN*/ 
export function* signInWithEmail({payload: {email,password}}){
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email,password);
        yield getSnapshotFromUserAuth(user);
    }catch(error){
        yield put(signInFailure(error))
    }
}
export function* onEmailSignInStart(){
    yield takeLatest(UserActionType.EMAIL_SIGN_IN_START,signInWithEmail)
}

/**
 * CHECK IF USER IS AUTHENTICATED
 */
export function* isUserAuthenticated(){
    try {
        const userAuth = yield getCurrentAuthUser();
        if(!userAuth) {
            yield put(clearCart());
            return;
        }
        yield getSnapshotFromUserAuth(userAuth);
    } catch(error){
        yield put(signInFailure(error))
    }
}
export function* onCheckUserSession(){
    yield takeLatest(UserActionType.CHECK_USER_SESSION,isUserAuthenticated)
}

/**
 * SIGN OUT
 */
export function* signOut(){
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch(error){
        yield put(signOutFailure(error));
    }
    
}
export function* onSignOutStart(){
    yield takeLatest(UserActionType.SIGN_OUT_START,signOut)
}

/**
 * SIGN UP
 */

export function* signUp({payload}){
    try {
        const {displayName,email,password} = payload;
        const {user} = yield auth.createUserWithEmailAndPassword(email,password);
        yield put(signUpSuccess({user,additionalData:{displayName}}));      
    } catch(error){
        yield put(signUpFailure(error));
    }    
}
export function* onSignUpStart(){
    yield takeLatest(UserActionType.SIGN_UP_START,signUp)
}

export function* signInAfterSignUp({payload: {user,additionalData}}){
    yield getSnapshotFromUserAuth(user,additionalData); 
}

export function* onSignupSuccess(){
    yield takeLatest(UserActionType.SIGN_UP_SUCCESS,signInAfterSignUp)
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignupSuccess)
    ])
}