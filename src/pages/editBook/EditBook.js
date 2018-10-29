import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from 'components/Header';
import ErrorDisplay from 'components/ErrorDisplay';
import Loader from 'components/Loader';
import UnknownBook from 'components/UnknownBook';
import EditBookForm from 'components/bookForm';

import { booksActions, booksSelectors, booksTypes } from 'state/modules/books';
import { apiSelectors } from 'state/modules/api'

const resultsLoadingSelector = apiSelectors.createLoadingSelector([booksTypes.LOAD_BOOKS_REQUEST]);
const resultsErrorSelector = apiSelectors.createErrorMessageSelector([booksTypes.LOAD_BOOKS_FAILURE]);

class EditBook extends Component {
  static propTypes = {
    book: PropTypes.object,
    deleteBook: PropTypes.func,
    error: PropTypes.string,
    isLoading: PropTypes.bool,
    loadBook: PropTypes.func,
    updateBoo: PropTypes.func
  }

  componentDidMount() {
      this.props.loadBook();
  }

  onSaveBook = (bookValues) => {
    this.props.updateBook(bookValues)
      .then(({ payload: { data: updatedBook } }) => {
        this.props.history.replace(`/books/${updatedBook.id}`);
      });
  }

  onDeleteBook = (bookId) => {
    this.props.deleteBook(bookId)
      .then(() => this.props.history.replace('/books'));
  }

  getHeader() {
    return (
      <Header>
        <h1>Edit Book</h1>
        <Link className="btn btn-secondary d-inline" to={ `/books/${this.props.book.id}` }>Cancel</Link>
      </Header>
    );
  }

  render() {
    const error = this.props.error || this.props.saveError;

    if(error) {
      return <ErrorDisplay error={ error } />;
    }

    if(this.props.isLoading) {
      return <Loader />;
    }

    if(!this.props.book) {
      return <UnknownBook />
    }

    return (
      <React.Fragment>
        { this.getHeader() }

        <div className="container">
          <EditBookForm
            book={ this.props.book }
            onDelete={ this.onDeleteBook }
            onSubmit={ this.onSaveBook }
          />
        </div>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
    const bookId = ownProps.match.params.id;
    const book = booksSelectors.getBookSelector(state, bookId);

    return {
      book,
      isLoading: book ? resultsLoadingSelector(state) : true,
      error: resultsErrorSelector(state),
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
