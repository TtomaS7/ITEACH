import firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDmHq-PlVqobtdMA2iccKN86vpDZjPmGWU",
    authDomain: "iteach-182f6.firebaseapp.com",
    databaseURL: "https://iteach-182f6.firebaseio.com",
    projectId: "iteach-182f6",
    storageBucket: "iteach-182f6.appspot.com",
    messagingSenderId: "955404404103"
};
firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const auth = firebase.auth
export const provider = new firebase.auth.FacebookAuthProvider();

export default firebase;
