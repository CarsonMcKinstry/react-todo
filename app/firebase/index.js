import firebase from 'firebase';

try {
  var config = {
    apiKey: "AIzaSyBbrgEMWCznwpVc4NAn7eyNeStEpyN67wA",
    authDomain: "react-todo-app-f5df4.firebaseapp.com",
    databaseURL: "https://react-todo-app-f5df4.firebaseio.com",
    projectId: "react-todo-app-f5df4",
    storageBucket: "react-todo-app-f5df4.appspot.com",
    messagingSenderId: "930595325165"
  };
  firebase.initializeApp(config);
} catch (e) {

}

export const firebaseRef = firebase.database().ref();
