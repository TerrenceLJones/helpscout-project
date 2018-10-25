import React from 'react';
import { Link } from 'react-router-dom';

import books from './bookData';

const UnknownBook = () => (
  <div>
    <p>Oops! It seems like this book couldn&#39;t be found.</p>
    <Link to="/books">Go to Book List</Link>
  </div>
);

export const BookDetails = ({ match, history }) => {
  const bookId = match.params.id;
  const book = books[bookId];

  if(!book) {
    return <UnknownBook />;
  }

  const { category, id, imagePreviewUrl, title } = book;

  return (
    <div>
      <div>
        <h1>Book Details</h1>
        <Link to='/books'>All books</Link>
        <Link to={ `/books/${id}/edit` }>Edit book</Link>

        <h3>{ title }</h3>
        <p>{ category }</p>
        <img src={ imagePreviewUrl } alt="Your book&#39;s cover image."/>
      </div>
    </div>
  );
}