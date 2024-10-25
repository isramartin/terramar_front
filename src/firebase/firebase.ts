import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig= ({
    "projectId": "terramar-e47fe",
    "appId": "1:280579992519:web:98dc94c2ccae4f08f907e2",
    "storageBucket": "terramar-e47fe.appspot.com",
    "apiKey": "AIzaSyDZOuWZlp3P1g4CXsb8C5idpD8kHbJIZC4",
    "authDomain": "terramar-e47fe.firebaseapp.com",
    "messagingSenderId": "280579992519",
    "measurementId": "G-B2BDTHX4VT"
  });
  
  const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { firebaseConfig, firebaseApp, auth};