import React from 'react';
import { Link } from 'react-router-dom';

import { UnknownBook } from './UnknownBook';

import books from './bookData';

export const BookDetails = ({ match, history }) => {
  const bookId = match.params.id;
  const book = books[bookId];

  if(!book) {
    return <UnknownBook />;
  }

  const { category, id, image: imagePreviewUrl, title } = book;

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