import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BookListItem = function Book({ book }) {
  const { category, id, image: imagePreviewUrl, title } = book;

  return (
    <li>
      <Link to={ `/books/${id}` }>
        <h3>{ title }</h3>
        <p>{ category }</p>
        <img src={ imagePreviewUrl } alt="Your book&#39;s cover."/>
      </Link>
    </li>
  )
};

BookListItem.propTypes = {
  book: PropTypes.object
}

export default BookListItem;
