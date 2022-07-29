// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBgB9P72664DvzEKyTYVAMDoOJNDNAV7Es",
  authDomain: "todo-c67b1.firebaseapp.com",
  projectId: "todo-c67b1",
  storageBucket: "todo-c67b1.appspot.com",
  messagingSenderId: "389134620972",
  appId: "1:389134620972:web:4bfd9afcbf670fc61ab489"
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;