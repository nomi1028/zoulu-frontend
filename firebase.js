import Firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCpvXSfHBAul5hxiDMMHzLnV6QTjK0h1ZE",
  authDomain: "zoulu-40be5.firebaseapp.com",
  projectId: "zoulu-40be5",
  storageBucket: "zoulu-40be5.appspot.com",
  messagingSenderId: "558820254244",
  appId: "1:558820254244:web:272c85259611baa73b2eb1",
  measurementId: "G-0SWGVJ4W6M",
};
const signInWithGoogle = () => {
  var provider = new Firebase.auth.GoogleAuthProvider();

  !Firebase.apps.length ? Firebase.initializeApp(firebaseConfig) : Firebase.app();
  return Firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      return result.user;
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credentijal;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      // console.log(JSON.stringify(user), "firebasecomp");
      return user;
      // ...
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
export default signInWithGoogle;
