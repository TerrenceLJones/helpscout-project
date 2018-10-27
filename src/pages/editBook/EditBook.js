import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ErrorDisplay from 'components/ErrorDisplay';
import Loader from 'components/Loader';
import { UnknownBook } from 'components/UnknownBook';
import EditBookForm from 'components/bookForm';

import { booksActions, booksSelectors, booksTypes } from 'state/modules/books';
import { apiSelectors } from 'state/modules/api'

const resultsLoadingSelector = apiSelectors.createLoadingSelector([booksTypes.LOAD_BOOKS_REQUEST]);
const resultsErrorSelector = apiSelectors.createErrorMessageSelector([booksTypes.LOAD_BOOKS_FAILURE]);


class EditBook extends Component {
  static propTypes = {
    book: PropTypes.object
  }

  componentDidMount() {
      this.props.loadBook();
  }

  handleSubmit = (bookValues) => {
    this.props.updateBook(bookValues)
      .then(({ payload: { data: newBook } }) => {
        this.props.history.replace(`/books/${newBook.id}`);
      });
  }

  handleDelete = (bookId) => {
    this.props.deleteBook(bookId)
      .then(() => this.props.history.replace('/books'));
  }

  getHeader() {
    return (
      <header>
        <h1>Edit Book</h1>
        <Link to={ `/books/${this.props.book.id}` }>Cancel</Link>
      </header>
    );
  }

  render() {
    if(this.props.error) {
    return <ErrorDisplay />;
    }

    if(this.props.isLoading) {
      return <Loader />;
    }

    if(!this.props.book) {
      return <UnknownBook />
    }

    return (
      <div>
        { this.getHeader() }

        <EditBookForm
          book={ this.props.book }
          handleDelete={ this.handleDelete }
          handleSubmit={ this.handleSubmit }
        />
      </div>
    );
  }
};

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
    deleteBook: bookId => dispatch(booksActions.deleteBook(bookId)),
    updateBook: bookData => dispatch(booksActions.updateBook(bookData))
  };
};

export {
  EditBook
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);
