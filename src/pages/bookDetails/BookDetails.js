import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames'

import Header from 'components/Header';
import ErrorDisplay from 'components/ErrorDisplay';
import Loader from 'components/Loader';
import UnknownBook from 'components/UnknownBook';

import { booksActions, booksSelectors, booksTypes } from 'state/modules/books';
import { apiSelectors } from 'state/modules/api'

import { getPlaceHolderImageUrl } from 'helpers/placeHolderImage';

import styles from './BookDetails.module.css';

const resultsLoadingSelector = apiSelectors.createLoadingSelector([booksTypes.LOAD_BOOKS_REQUEST]);
const resultsErrorSelector = apiSelectors.createErrorMessageSelector([booksTypes.LOAD_BOOKS_FAILURE]);

class BookDetails extends Component {
  static propTypes = {
    book: PropTypes.object,
    error: PropTypes.string,
    loadBook: PropTypes.func,
    isLoading: PropTypes.bool
  }

  componentDidMount() {
      this.props.loadBook();
  }

  getHeader() {
    return (
      <Header>
        <h1>Book Details</h1>
        <div>
          <Link className="btn btn-secondary mr-3 d-inline" to='/books'>All books</Link>
          <Link className="btn btn-success" to={ `/books/${this.props.book.id}/edit` }>Edit book</Link>
        </div>
      </Header>
    );
  }

  getBookDetails = () => {
    const { category, author, image, title } = this.props.book;
    const backgroundImage = image || getPlaceHolderImageUrl(title);
    const imageContainerStyles = classNames(styles.imageContainer, 'card shadow-sm"');

    return (
      <div className="row">
        <div className="col-md-6 mb-2">
          <div className={ imageContainerStyles }>
            <div
              className={ styles.image }
              style={ { backgroundImage: `url("${backgroundImage}")`} }
            />
          </div>
        </div>
        <div className="col-md-6">
          <h3>{ title }</h3>
          <p>{ author }</p>
          <p>{ category }</p>
        </div>
      </div>
    );
  }

  render () {
    const error = this.props.error;
    if(error) {
      return <ErrorDisplay error={ error } />;
    }

    if(this.props.isLoading) {
      return <Loader />;
    }

    if(!this.props.book) {
      return <UnknownBook />;
    }

    return (
      <React.Fragment>
        { this.getHeader() }
        <div className="container">
          { this.getBookDetails() }
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    const bookId = ownProps.match.params.id;
    const book = booksSelectors.getBookSelector(state, bookId);

    return {
      isLoading: book ? resultsLoadingSelector(state) : true,
      loadError: resultsErrorSelector(state),
      book
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const bookId = ownProps.match.params.id;

    return {
      loadBook: () => dispatch(booksActions.loadBook(bookId)),
    };
};

export {
  BookDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
