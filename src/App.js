import { useEffect, useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";

import AddBook from "./components/AddBook";
import BooksList from "./components/BooksList";
import Login from "./components/Login"

import { useFirebase } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./firebase-config.js";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [bookId, setBookId] = useState("");

  // const [email,setEmail]=useState('');
  // const [pwd,setPwd]=useState('');

  const firebase = useFirebase();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
        console.log(user);
        // alert("Sign in successful")
      } else {
        setUser(null);
        // alert("Signed out");
      }
    });
  });

  

  const getBookIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setBookId(id);
  };
  if (user === null) {
    return (
      <Login/>
    );
  } else {
    return (
      <>
        <Navbar bg="dark" variant="dark" className="header">
          <Container>
            <Navbar.Brand href="#home">Library - Firebase CRUD</Navbar.Brand>
          </Container>
          <button onClick={()=>{firebase.signout()}}>SignOut</button>

        </Navbar>

        <Container style={{ width: "400px" }}>
          <Row>
            <Col>
              <AddBook id={bookId} setBookId={setBookId} user={user}/>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <BooksList getBookId={getBookIdHandler} userId={user.uid}/>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
