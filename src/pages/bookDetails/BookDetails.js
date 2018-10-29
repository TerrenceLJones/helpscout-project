import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from 'components/Header';
import ErrorDisplay from 'components/ErrorDisplay';
import Loader from 'components/Loader';
import { UnknownBook } from 'components/UnknownBook';

import { booksActions, booksSelectors, booksTypes } from 'state/modules/books';
import { apiSelectors } from 'state/modules/api'

const resultsLoadingSelector = apiSelectors.createLoadingSelector([booksTypes.LOAD_BOOKS_REQUEST]);
const resultsErrorSelector = apiSelectors.createErrorMessageSelector([booksTypes.LOAD_BOOKS_FAILURE]);

class BookDetails extends Component {
  static propTypes = {
    book: PropTypes.object
  }

  componentDidMount() {
      this.props.loadBook();
  }

  getHeader() {
    return (
      <Header>
        <h1>Book Details</h1>
        <div>
          <Link className="btn btn-secondary mr-3" to='/books'>All books</Link>
          <Link className="btn btn-success" to={ `/books/${this.props.book.id}/edit` }>Edit book</Link>
        </div>
      </Header>
    );
  }

  getBookDetails = () => {
    const { category, author, image, title } = this.props.book;
    const backgroundImage = image || 'https://dummyimage.com/448x400/000/fff.png&text=Add+a+Book+Cover';

    return (
      <div className="row">
        <div className="col-6" style={ { height: '400px' } }>
          <div style={ {
            backgroundImage: `url("${backgroundImage}")`,
            backgroundSize: 'cover',
            display: 'block',
            height: '100%'
          } } />
        </div>
        <div className="col-6">
          <h3>{ title }</h3>
          <p>{ author }</p>
          <p>{ category }</p>
        </div>
      </div>


    );
  }

  render () {
    if(this.props.error) {
      return <ErrorDisplay />;
    }

    if(this.props.isLoading) {
      return <Loader />;
    }

    if(!this.props.book) {
      return <UnknownBook />;
    }

    return (
      <React.Fragment>
        { this.getHeader() }
        <div className="container">
          { this.getBookDetails() }
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    const bookId = ownProps.match.params.id;
    const book = booksSelectors.getBookSelector(state, bookId);

    return {
      isLoading: book ? resultsLoadingSelector(state) : true,
      loadError: resultsErrorSelector(state),
      book
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const bookId = ownProps.match.params.id;

    return {
      loadBook: () => dispatch(booksActions.loadBook(bookId)),
    };
};

export {
  BookDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
