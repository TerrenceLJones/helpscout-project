import _ from 'lodash';

import { createBook, loadAll } from 'helpers/api';

const types = {
  CREATE_BOOK_REQUEST: 'CREATE_BOOK_REQUEST',
  CREATE_BOOK_SUCCESS: 'CREATE_BOOK_SUCCESS',
  CREATE_BOOK_FAILURE: 'CREATE_BOOK_FAILURE',
  LOAD_BOOKS_REQUEST: 'LOAD_BOOKS_REQUEST',
  LOAD_BOOKS_SUCCESS: 'LOAD_BOOKS_SUCCESS',
  LOAD_BOOKS_FAILURE: 'LOAD_BOOKS_FAILURE',
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
    case types.LOAD_BOOKS_SUCCESS:
      const { books } = payload.data;

      return {
        byId: _.keyBy(books, 'id')
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
  loadBooks: () => dispatch => {
    return loadAll()
      .then(res => dispatch(actions.loadBooksSuccess(res)))
      .catch(error => dispatch(actions.loadBooksFailure(error)))
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
  })
};

const selectors = {
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
