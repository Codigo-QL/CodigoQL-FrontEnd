import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBnDjtqq4WFQfeSt-PW-bA-ftshWxzmtGc",
  authDomain: "codigoql-638fe.firebaseapp.com",
  projectId: "codigoql-638fe",
  storageBucket: "codigoql-638fe.firebasestorage.app",
  messagingSenderId: "468489424696",
  appId: "1:468489424696:web:0fcc1345e9a404c3603bcd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
