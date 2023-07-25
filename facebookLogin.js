import Firebase from "firebase";
import jwt from "jsonwebtoken";
const firebaseConfig = {
  apiKey: "AIzaSyCpvXSfHBAul5hxiDMMHzLnV6QTjK0h1ZE",
  authDomain: "zoulu-40be5.firebaseapp.com",
  projectId: "zoulu-40be5",
  storageBucket: "zoulu-40be5.appspot.com",
  messagingSenderId: "558820254244",
  appId: "1:558820254244:web:272c85259611baa73b2eb1",
  measurementId: "G-0SWGVJ4W6M",
};

const FacebookLogin = async () => {
  let provider = new Firebase.auth.FacebookAuthProvider();
  !Firebase.apps.length
    ? Firebase.initializeApp(firebaseConfig)
    : Firebase.app();
  return Firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const token = jwt.decode(result?.user?.Aa);
      return token;
      /** @type {firebase.auth.OAuthCredential} */
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
};
export default FacebookLogin;
