import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import BookDataService from "../services/book.services";

const BooksList = ({ getBookId, userId }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const data = await BookDataService.getAllBooks(userId);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    const decision=prompt("This action is permanent and cannot be rolled back. Do you want to permanently delete it (y/n)?");
    if(decision==="y"){
        await BookDataService.deleteBook(id,userId);
        getBooks();
    }
    
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getBooks}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm" >
        <thead>
          <tr>
            <th>#</th>
            <th style={{fontWeight: "bolder"}}>Book Title</th>
            <th style={{fontWeight: "bolder"}}>Book Author</th>
            <th style={{fontWeight: "bolder"}}>Status</th>
            <th style={{fontWeight: "bolder"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td style={{fontWeight: "bold"}}>{index + 1}</td>
                <td style={{fontWeight: "bold"}}>{doc.title}</td>
                <td style={{fontWeight: "bold"}}>{doc.author}</td>
                <td style={{fontWeight: "bold"}}>{doc.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getBookId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default BooksList;