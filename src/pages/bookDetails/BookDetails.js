import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ErrorDisplay from 'components/ErrorDisplay';
import Loader from 'components/Loader';
import { UnknownBook } from 'components/UnknownBook';

import { booksActions, booksSelectors, booksTypes } from 'state/modules/books';
import { apiSelectors } from 'state/modules/api'

const resultsLoadingSelector = apiSelectors.createLoadingSelector([booksTypes.LOAD_BOOKS_REQUEST]);
const resultsErrorSelector = apiSelectors.createErrorMessageSelector([booksTypes.LOAD_BOOKS_FAILURE]);

class BookDetails extends Component {
  static propTypes = {
    book: PropTypes.object
  }

  componentDidMount() {
      this.props.loadBook();
  }

  render () {
    if(this.props.error) {
      return <ErrorDisplay />;
    }

    if(this.props.isLoading) {
      return <Loader />;
    }

    if(!this.props.book) {
      return <UnknownBook />;
    }

    const { category, id, image, title } = this.props.book;

    return (
      <div>
        <div>
          <h1>Book Details</h1>
          <Link to='/books'>All books</Link>
          <Link to={ `/books/${id}/edit` }>Edit book</Link>

          <h3>{ title }</h3>
          <p>{ category }</p>
          <img src={ image } alt="Your book&#39;s cover."/>
        </div>
      </div>
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
