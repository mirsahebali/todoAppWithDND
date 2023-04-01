// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
          apiKey: "AIzaSyBFwlBOCBH7GS3ZKxjZpkRJ0RcxZB6TykU",
          authDomain: "project-21973.firebaseapp.com",
          projectId: "project-21973",
          storageBucket: "project-21973.appspot.com",
          messagingSenderId: "838612465956",
          appId: "1:838612465956:web:30ec3d7ef48d548ab35bb1"
        };
        
        

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);