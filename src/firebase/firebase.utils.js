import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config =  {
    apiKey: "AIzaSyA_YH8PWReM2tfVpuDKvo-NY3A2J2A4DhA",
    authDomain: "react-course-crwn-db.firebaseapp.com",
    databaseURL: "https://react-course-crwn-db.firebaseio.com",
    projectId: "react-course-crwn-db",
    storageBucket: "",
    messagingSenderId: "562143451658",
    appId: "1:562143451658:web:9c43cb74162bf28f"
  }



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const userSnapShot = await userRef.get();
  
  if(!userSnapShot.exists){
    const { displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch(error) {
      console.log("error creating user",error);

    }
  }

  return userRef;
}