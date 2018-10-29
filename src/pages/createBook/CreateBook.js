import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from 'components/Header';
import CreateBookFrom from 'components/bookForm';
import Loader from 'components/Loader';
import ErrorDisplay from 'components/ErrorDisplay';

import { booksActions } from 'state/modules/books';

import { booksTypes } from 'state/modules/books';
import { apiSelectors } from 'state/modules/api'

const processingSelector = apiSelectors.createLoadingSelector([booksTypes.LOAD_BOOKS_REQUEST, booksTypes.UPDATE_BOOK_REQUEST]);
const errorSelector = apiSelectors.createErrorMessageSelector([booksTypes.LOAD_BOOKS_FAILURE, booksTypes.UPDATE_BOOK_FAILURE]);


const CreateBook = (props) => {
  const { createBook, error, history, isProccessing } = props;
  const onSubmit = (bookValues) => {
    createBook(bookValues)
      .then(({ payload: { data: newBook } }) => {
        history.replace(`/books/${newBook.id}`);
      });
  }

  const getHeader = () => {
    return (
      <Header>
        <h1>Create a New Book</h1>
        <Link className="btn btn-secondary" to="/books">Cancel</Link>
      </Header>
    );
  }

  if(isProccessing) {
    return <Loader />;
  }

  if(error) {
    return <ErrorDisplay />;
  }

  return (
    <main>
      { getHeader() }

      <div className="container">
        <CreateBookFrom onSubmit={ onSubmit } />
      </div>
    </main>
  );
}

CreateBook.propTypes = {
  createBook: PropTypes.func,
  error: PropTypes.string,
  isProccessing: PropTypes.bool
};


const mapStateToProps = (state, ownProps) => {
  return {
      isProccessing: processingSelector(state),
      error: errorSelector(state),
    };
};

const mapDispatchToProps = dispatch => ({
  createBook: bookData => dispatch(booksActions.createBook(bookData)),
});

export {
  CreateBook
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook);
