import _ from 'lodash';

import { createBook } from 'helpers/api';

const types = {
  CREATE_BOOK_REQUEST: 'CREATE_BOOK_REQUEST',
  CREATE_BOOK_SUCCESS: 'CREATE_BOOK_SUCCESS',
  CREATE_BOOK_FAILURE: 'CREATE_BOOK_FAILURE',
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
  })
};

const selectors = {};

export {
  actions,
  selectors,
  types
};

export default reducer;
