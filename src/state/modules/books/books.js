import _ from 'lodash';

import { createBook, updateBook, deleteBook, loadAll, loadOne } from 'helpers/api';

const types = {
  CREATE_BOOK_REQUEST: 'CREATE_BOOK_REQUEST',
  CREATE_BOOK_SUCCESS: 'CREATE_BOOK_SUCCESS',
  CREATE_BOOK_FAILURE: 'CREATE_BOOK_FAILURE',
  UPDATE_BOOK_REQUEST: 'UPDATE_BOOK_REQUEST',
  UPDATE_BOOK_SUCCESS: 'UPDATE_BOOK_SUCCESS',
  UPDATE_BOOK_FAILURE: 'UPDATE_BOOK_FAILURE',
  DELETE_BOOK_REQUEST: 'DELETE_BOOK_REQUEST',
  DELETE_BOOK_SUCCESS: 'DELETE_BOOK_SUCCESS',
  DELETE_BOOK_FAILURE: 'DELETE_BOOK_FAILURE',
  LOAD_BOOKS_REQUEST: 'LOAD_BOOKS_REQUEST',
  LOAD_BOOKS_SUCCESS: 'LOAD_BOOKS_SUCCESS',
  LOAD_BOOKS_FAILURE: 'LOAD_BOOKS_FAILURE',
  LOAD_BOOK_REQUEST: 'LOAD_BOOK_REQUEST',
  LOAD_BOOK_SUCCESS: 'LOAD_BOOK_SUCCESS',
  LOAD_BOOK_FAILURE: 'LOAD_BOOK_FAILURE'
};

const initialState = {
  byId: {}
};

const reducer = (state = initialState, { payload, type } = {}) => {

  switch(type) {
    case types.CREATE_BOOK_SUCCESS:
      return {
        byId: {
          ...state.byId,
          [payload.data.id]: payload.data
        }
      };
    case types.UPDATE_BOOK_SUCCESS:
      return {
        byId: {
          ...state.byId,
          [payload.data.id]: payload.data
        }
      };
    case types.DELETE_BOOK_SUCCESS:
      const { [payload.data.id]: value, ...restOfBooks } = state.byId;

      return {
        byId: restOfBooks
      };
    case types.LOAD_BOOKS_SUCCESS:
      const { books } = payload.data;

      return {
        byId: _.keyBy(books, 'id')
      };
    case types.LOAD_BOOK_SUCCESS:
      return {
        byId: {
          ...state.byId,
          [payload.data.book.id]: payload.data.book
        }
      };
    default:
      return state;
  }
};

const actions = {
  createBook: bookData => dispatch => {
    return createBook(bookData)
      .then(res => dispatch(actions.createBookSuccess(res)))
      .catch(error => dispatch(actions.createBookFailure(error)));
  },
  updateBook: bookData => dispatch => {
    return updateBook(bookData)
      .then(res => dispatch(actions.updateBookSuccess(res)))
      .catch(error => dispatch(actions.updateBookFailure(error)));
  },
  deleteBook: bookId => dispatch => {
    return deleteBook(bookId)
      .then(res => dispatch(actions.deleteBookSuccess(res)))
      .catch(error => dispatch(actions.deleteBookFailure(error)))
  },
  loadBooks: () => dispatch => {
    return loadAll()
      .then(res => dispatch(actions.loadBooksSuccess(res)))
      .catch(error => dispatch(actions.loadBooksFailure(error)))
  },
  loadBook: (bookId) => dispatch => {
    return loadOne(bookId)
      .then(res => dispatch(actions.loadBookSuccess(res)))
      .catch(error => dispatch(actions.loadBookFailure(error)))
  },
  createBookSuccess: newBook => ({
    type: types.CREATE_BOOK_SUCCESS,
    payload: {
      data: newBook
    }
  }),
  createBookFailure: error => ({
    type: types.CREATE_BOOK_FAILURE,
    payload: {
      error
    }
  }),
  updateBookSuccess: newBook => ({
    type: types.CREATE_BOOK_SUCCESS,
    payload: {
      data: newBook
    }
  }),
  updateBookFailure: error => ({
    type: types.CREATE_BOOK_FAILURE,
    payload: {
      error
    }
  }),
  deleteBookSuccess: bookId => ({
    type: types.DELETE_BOOK_SUCCESS,
    payload: {
      data: {
        id: bookId
      }
    }
  }),
  deleteBookFailure: error => ({
    type: types.DELETE_BOOK_FAILURE,
    payload: {
      error
    }
  }),
  loadBooksSuccess: books => ({
    type: types.LOAD_BOOKS_SUCCESS,
    payload: {
      data: {
        books
      }
    }
  }),
  loadBooksFailure: error => ({
    type: types.LOAD_BOOKS_FAILURE,
    payload: {
      error
    }
  }),
  loadBookSuccess: book => ({
    type: types.LOAD_BOOK_SUCCESS,
    payload: {
      data: {
        book
      }
    }
  }),
  loadBookFailure: error => ({
    type: types.LOAD_BOOK_FAILURE,
    payload: {
      error
    }
  })
};

const selectors = {
  getBookSelector(state, bookId) {
    return state.books.byId[bookId];
  },
  getBooksSelector(state) {
    const booksByIdState = state.books.byId;
    const bookIds = Object.keys(booksByIdState);

    return bookIds.map((id) => booksByIdState[id]);
  },
  getFilteredBooks(books, filterCategory) {
    if(!filterCategory) {
      return books;
    }

    return books.filter(book => {
      return book.category === filterCategory
    })
  },
  getSortedBooks(books, sortBy, sortDirection) {
    return _.orderBy(books, sortBy, [sortDirection]);
  }
};

export {
  actions,
  selectors,
  types
};

export default reducer;
