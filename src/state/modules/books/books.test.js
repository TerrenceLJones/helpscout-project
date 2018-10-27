import reducer, { actions, types } from './books';

describe('actions', () => {
  it('creates an action for a request to create a book', () => {});
  it('creates an action for a successful create book response', () => {});
  it('creates an action for a failing create book response', () => {});

  describe('createBook', () => {
    describe('when api call is successful', () => {
      it('calls createBookSuccess event created', () => {});
    })

    describe('when api call is not successful', () => {
      it('calls createBookFailure event creator', () => {})
    });
  });
});

describe('reducer', () => {
  it('handles CREATE_BOOK_REQUEST action', () => {});
  it('handles CREATE_BOOK_SUCCESS action', () => {});
  it('handles CREATE_BOOK_FAILURE action', () => {});
});
