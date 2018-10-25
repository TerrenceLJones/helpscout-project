import React from 'react';
import { Link } from 'react-router-dom';
import bookData from './bookData';

const displayedBooksSelector = () => {
  const bookIds = Object.keys(bookData);

  return bookIds.map((id) => bookData[id]);
}

const EmptyView = () => (
  <div>
    <h1>You haven&#39;t created any books yet.</h1>
    <Link to="/create">Create a new book</Link>
  </div>
);

const Book = function Book({ book }) {
  const { category, imagePreviewUrl, title } = book;

  return (
    <li>
      <h3>{ title }</h3>
      <p>{ category }</p>
      <img src={ imagePreviewUrl } alt="Your book&#39;s cover image."/>
    </li>
  )
};

export const Books = () => {
  const books = displayedBooksSelector();

  if(!books.length) {
    return <EmptyView />;
  }

  return (
    <ol>
      { books.map(book => <Book key={ book.id } book={ book }/>) }
    </ol>
  );
};
