import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBPkXircb5_cAYV36IHWtDKBif8Ve9Y4PE",
    authDomain: "crwn-db-cabfb.firebaseapp.com",
    projectId: "crwn-db-cabfb",
    storageBucket: "crwn-db-cabfb.appspot.com",
    messagingSenderId: "884290603138",
    appId: "1:884290603138:web:a0eb39acf09cef0dfe4c9b",
    measurementId: "G-FV12NVWVQ0"
  };




export const createUserProfileDocument = async (userAuth, additonalData) => {
  if(!userAuth) return;

  //get the refernce first
  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  //get the snapshot
  const snapshot = await userRef.get();

  if(!snapshot.exists)
  {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additonalData
        }
      );
      console.log('new user created');
      
    }catch(error){
       console.log('error creating user: ', error.message);
    }
  }

  return userRef;

}


export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef= firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
}

export const convertCollectionSnapshotToMap = (collections) =>{
  const transformedCollections = collections.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  console.log(transformedCollections);
  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}



firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

