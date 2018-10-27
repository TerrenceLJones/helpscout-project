import reducer, { actions, types } from './books';

describe('actions', () => {
  it('creates an action for a request to load books', () => {});
  it('creates an action for a successful load books response', () => {});
  it('creates an action for a failing load books response', () => {});
  it('creates an action for a request to load an individual book', () => {});
  it('creates an action for a successful load individual book response', () => {});
  it('creates an action for a failing load individual book response', () => {});
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

  describe('loadBooks', () => {
    describe('when api call is successful', () => {
      it('calls loadBooksSuccess event created', () => {});
    })

    describe('when api call is not successful', () => {
      it('calls loadBooksFailure event creator', () => {})
    });
  });

  describe('loadBook', () => {
    describe('when api call is successful', () => {
      it('calls loadBookSuccess event created', () => {});
    })

    describe('when api call is not successful', () => {
      it('calls loadBookFailure event creator', () => {})
    });
  })
});

describe('reducer', () => {
  it('handles CREATE_BOOK_REQUEST action', () => {});
  it('handles CREATE_BOOK_SUCCESS action', () => {});
  it('handles CREATE_BOOK_FAILURE action', () => {});
  it('handles LOAD_BOOKS_REQUEST action', () => {});
  it('handles LOAD_BOOKS_SUCCESS action', () => {});
  it('handles LOAD_BOOKS_FAILURE action', () => {});
  it('handles LOAD_BOOK_REQUEST action', () => {});
  it('handles LOAD_BOOK_SUCCESS action', () => {});
  it('handles LOAD_BOOK_FAILURE action', () => {});
});
