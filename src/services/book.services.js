import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


class BookDataService {
  addBooks = async(newBook,userId) => {
    const bookCollectionRef = collection(db,'books',userId,'bookList');

    
    return addDoc(bookCollectionRef, newBook);
  };

  updateBook = (id,userId,updatedBook) => {
    const bookDoc = doc(db, "books",userId, "bookList",id);
    return updateDoc(bookDoc, updatedBook);
  };

  deleteBook = (id,userId) => {
    const bookDoc = doc(db, "books", userId, "bookList", id);
    return deleteDoc(bookDoc);
  };

  getAllBooks = async(userId) => {
    const bookCollectionRef = collection(db,'books',userId,'bookList');





    return getDocs(bookCollectionRef);
  };

  getBook = (id,userId) => {
    const bookDoc = doc(db, "books", userId, "bookList", id);

    return getDoc(bookDoc);
  };
}

export default new BookDataService();