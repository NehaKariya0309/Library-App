import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {getDatabase, set ,ref} from "firebase/database"
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, getDoc,query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAi0hpdMo64FagE_3Q5uhLMvHQACE74OUQ",
  authDomain: "react-crud-app-fea55.firebaseapp.com",
  projectId: "react-crud-app-fea55",
  storageBucket: "react-crud-app-fea55.appspot.com",
  messagingSenderId: "243893639897",
  appId: "1:243893639897:web:81e6baeda51f28cfde3cc8",
  measurementId: "G-L9T3VDGS7Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();
const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const signupUserWithEmailAndPassword = (email, password) => {
     createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        alert("Successfully signed up")
      })
      .catch((err) => {
        if (err.code == "auth/email-already-in-use") {
          alert("Email already in use");
        }
        console.log(err);
      });
  };

  const signIn = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        alert("Successfully signed in");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(firebaseAuth, provider)
      .then((userCredential) => {
        alert("Successfully signed in");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const signout = () => {
      signOut(firebaseAuth)
      .then((userCredential) => {
        alert("Successfully signed out");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const makeSubCollection = async(userId,newBook)=>{
    const bookCollectionRef = collection(db, "books/"+userId);
    addDoc(bookCollectionRef,newBook);
}

  return (
    <>
      <FirebaseContext.Provider
        value={{
          signupUserWithEmailAndPassword,
          signInWithGoogle,
          signout,
          signIn,
          makeSubCollection,

        }}
      >
        {props.children}
      </FirebaseContext.Provider>
    </>
  );
};
