import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { getPlaceHolderImageUrl } from 'helpers/placeHolderImage';

import styles from './BookListItem.module.css';


const BookListItem = function Book({ book }) {
  const { author, category, id, image: imagePreviewUrl, title } = book;
  const backgroundImage = imagePreviewUrl || getPlaceHolderImageUrl(title);
  const listItemClasses = classNames(styles.listItem, 'card', 'col-10', 'mb-4');

  return (
    <li className={ listItemClasses }>
      <Link to={ `/books/${id}` }>
        <div className="row">
          <div className={ classNames(styles.leftContainer, 'col-6') }>
            <div className={ styles.imageContainer }>
              <div className={ styles.image } style={ { backgroundImage: `url("${backgroundImage}")` } } />
            </div>
          </div>
          <div className="card-body col-6">
            <h3 className={ styles.meta }>{ title }</h3>
            <h4 className={ styles.meta }>{ author }</h4>
            <p className={ styles.meta }>{ category }</p>
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
