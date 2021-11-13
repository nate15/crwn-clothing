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

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

