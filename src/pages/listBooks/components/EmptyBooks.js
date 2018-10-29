import React from 'react';
import { Link } from 'react-router-dom';

const EmptyBooks = () => (
  <div className="text-center">
    <div className="cover-container d-flex flex-column">
      <div className="mt-5">
        <h1 className="cover-heading">You haven&#39;t created any books yet.</h1>
        <p className="mt-3">
          <Link className="btn btn-success" to="/books/new">Create a new book</Link>
        </p>
      </div>
    </div>
  </div>
);

export default EmptyBooks;
