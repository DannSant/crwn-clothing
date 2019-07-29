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

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = ()=> auth.signInWithPopup(googleProvider);

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

export const addCollectionAndDocuments = async(collectionKey,objectsToAdd) =>{
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();

  objectsToAdd.forEach(obj =>{
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef,obj);
  });

  return await batch.commit();

}

export const convertCollectionsSnapshotToMap = (collections)=>{
  const transformedCollection = collections.docs.map( doc =>{
    const {title,items} = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
 
  return transformedCollection.reduce((accum,collection)=>{
    accum[collection.title.toLowerCase()] = collection;
    return accum;
  }, {})
}

export const getCurrentAuthUser =()=>{
  return new Promise((resolve,reject)=>{
    const unsuscribe = auth.onAuthStateChanged(userAuth=>{
      unsuscribe();
      resolve(userAuth);
    }, reject)
  })
}