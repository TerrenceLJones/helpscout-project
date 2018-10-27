import { combineReducers } from 'redux';
import apiReducer from 'state/modules/api';
import booksReducer from 'state/modules/books';

export default combineReducers({
  api: apiReducer,
  books: booksReducer,
});
