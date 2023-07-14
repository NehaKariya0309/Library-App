import { useEffect, useState } from "react";
import { Container, Navbar, Row, Col, Button } from "react-bootstrap";

import AddBook from "./components/AddBook";
import BooksList from "./components/BooksList";
import Login from "./components/Login";

import { useFirebase } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./firebase-config.js";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [bookId, setBookId] = useState("");

  const firebase = useFirebase();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });
  });

  const getBookIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setBookId(id);
  };
  if (user === null) {
    return <Login />;
  } else {
    return (
      <>
        <Navbar bg="dark" variant="dark" className="header">
          <Container>
            <Navbar.Brand >
            BookStacker 📚
            </Navbar.Brand>
          </Container>
          
          <Button
            style={{ width: "100px" }}
            onClick={() => {
              firebase.signout();
            }}
          >
            SignOut
          </Button>

        </Navbar>

        <Container style={{ width: "400px" }}>
          <Row>
            <Col>
              <AddBook id={bookId} setBookId={setBookId} user={user} />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <BooksList getBookId={getBookIdHandler} userId={user.uid} />
            </Col>
          </Row>
        </Container>
        <div className="footer">
          Created with ❤ by Neha Kariya. Visit the{" "}
          <a href="https://github.com/NehaKariya0309/Library-App" target="_blank">
            Github repository
          </a>{" "}
          here.
        </div>
      </>
    );
  }
}

export default App;
