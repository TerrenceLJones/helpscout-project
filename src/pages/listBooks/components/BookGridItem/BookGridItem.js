import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { getPlaceHolderImageUrl } from 'helpers/placeHolderImage';

import styles from './BookGridItem.module.css';

const BookGridItem = function Book({ book }) {
  const { id, image: imagePreviewUrl, title } = book;
  const backgroundImage = imagePreviewUrl || getPlaceHolderImageUrl(title);
  const containerClasses = classNames(styles.item, 'card', 'col-md-3', 'col-sm-12', 'mb-4', 'shadow-sm' );

  return (
    <li className={ containerClasses }>
      <Link className={ styles.itemLink } to={ `/books/${id}` }>
        <div
          className={ styles.itemImage }
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
