import React from 'react';
import { Link } from 'react-router-dom';

const UnknownBook = () => (
  <div>
    <p>Oops! It seems like this book couldn&#39;t be found.</p>
    <Link to="/books">Go to Book List</Link>
    <Link to="/books/new">Create a new book</Link>
  </div>
);

export default UnknownBook;
