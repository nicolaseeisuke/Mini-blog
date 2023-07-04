import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCbv31NeyU79Ga53wiq1oaugc-e-2xuBR4",
  authDomain: "mini-blog-9b42c.firebaseapp.com",
  projectId: "mini-blog-9b42c",
  storageBucket: "mini-blog-9b42c.appspot.com",
  messagingSenderId: "583196668946",
  appId: "1:583196668946:web:335ab28f7a2c4c0a8ad4cb"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}