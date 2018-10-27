import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CreateBookFrom from 'components/bookForm';

import { booksActions } from 'state/modules/books';

const CreateBook = ({ createBook, history }) => {

  const handleSubmit = (bookValues) => {
    createBook(bookValues)
      .then(({ payload: { data: newBook } }) => {
        history.replace(`/books/${newBook.id}`);
      });
  }

  const getHeader = () => {
    return (
      <header>
        <h1>Create a New Book</h1>
        <Link to={ `/books` }>Cancel</Link>
      </header>
    );
  }

  return (
    <div>
      { getHeader() }

      <CreateBookFrom handleSubmit={ handleSubmit } />
    </div>
  );
}

CreateBook.propTypes = {
  createBook: PropTypes.func,
  history: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  createBook: bookData => dispatch(booksActions.createBook(bookData)),
});

export {
  CreateBook
}

export default connect(null, mapDispatchToProps)(CreateBook);
