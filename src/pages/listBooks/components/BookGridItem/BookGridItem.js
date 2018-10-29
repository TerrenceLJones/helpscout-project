import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './BookGridItem.module.css';

const BookGridItem = function Book({ book }) {
  const { id, image: imagePreviewUrl, title } = book;
  const backgroundImage = imagePreviewUrl || 'https://dummyimage.com/448x400/000/fff.png&text=Add+a+Book+Cover';

  return (
    <li className={ `${styles.bookGridItem } card col-md-3 col-sm-12 mb-4 shadow-sm` }>
      <Link className={ styles.bookGridItemLink } to={ `/books/${id}` }>
        <div
          className={ styles.bookGridItemImage }
          style={ { backgroundImage: `url("${backgroundImage}")` } }
        />
      </Link>
    </li>
  )
};

BookGridItem.propTypes = {
  book: PropTypes.object
}

export default BookGridItem;
