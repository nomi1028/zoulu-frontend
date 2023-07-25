import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCpvXSfHBAul5hxiDMMHzLnV6QTjK0h1ZE",
  authDomain: "zoulu-40be5.firebaseapp.com",
  projectId: "zoulu-40be5",
  storageBucket: "zoulu-40be5.appspot.com",
  messagingSenderId: "558820254244",
  appId: "1:558820254244:web:272c85259611baa73b2eb1",
  measurementId: "G-0SWGVJ4W6M",
};
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
var auth = firebase.auth();
export { auth, firebase };
