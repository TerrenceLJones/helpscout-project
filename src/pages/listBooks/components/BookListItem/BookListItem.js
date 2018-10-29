import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './BookListItem.module.css';
const BookListItem = function Book({ book }) {
  const { author, category, id, image: imagePreviewUrl, title } = book;
  const backgroundImage = imagePreviewUrl || 'https://dummyimage.com/448x400/000/fff.png&text=Add+a+Book+Cover';

  return (
    <li className={`${styles.bookListItem } card col-12 mb-4`}>
      <Link to={ `/books/${id}` }>
        <div className="row">
          <div className={`${styles.bookListImageContainer} col-6` }>
            <div style={ {
              backgroundImage: `url("${backgroundImage}")`,
              backgroundSize: 'cover',
              display: 'block',
              height: '100%'
            } } />
          </div>
          <div className="card-body col-6">
            <h3 className={ styles.bookMeta }>{ title }</h3>
            <h4 className={ styles.bookMeta }>{ author }</h4>
            <p className={ styles.bookMeta }>{ category }</p>
          </div>
        </div>
      </Link>
    </li>
  )
};

BookListItem.propTypes = {
  book: PropTypes.object
}

export default BookListItem;
