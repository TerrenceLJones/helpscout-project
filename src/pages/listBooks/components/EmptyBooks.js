import React from 'react';
import { Link } from 'react-router-dom';

const EmptyBooks = () => (
  <div>
    <h1>You haven&#39;t created any books yet.</h1>
    <Link to="/books/new">Create a new book</Link>
  </div>
);

export default EmptyBooks;
