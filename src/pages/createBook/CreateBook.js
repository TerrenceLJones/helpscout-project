import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from 'components/Header';
import CreateBookFrom from 'components/bookForm';

import { booksActions } from 'state/modules/books';

const CreateBook = ({ createBook, history }) => {

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
  history: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  createBook: bookData => dispatch(booksActions.createBook(bookData)),
});

export {
  CreateBook
}

export default connect(null, mapDispatchToProps)(CreateBook);
