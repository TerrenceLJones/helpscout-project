import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import ErrorDisplay from 'components/ErrorDisplay';
import Loader from 'components/Loader';
import EmptyBooks from 'pages/listBooks/components/EmptyBooks';
import BookGridItem from 'pages/listBooks/components/BookGridItem';
import BookListItem from 'pages/listBooks/components/BookListItem';
import ViewToggle from 'pages/listBooks/components/ListControls/ViewToggle';
import BookFilterSelector from 'pages/listBooks/components/ListControls/BookFilterSelector';
import SortBySelector from 'pages/listBooks/components/ListControls/SortBySelector';
import SortDirectionSelector from 'pages/listBooks/components/ListControls/SortDirectionSelector';

import { booksActions, booksSelectors, booksTypes } from 'state/modules/books';
import { apiSelectors } from 'state/modules/api'

const resultsLoadingSelector = apiSelectors.createLoadingSelector([booksTypes.LOAD_BOOKS_REQUEST]);
const resultsErrorSelector = apiSelectors.createErrorMessageSelector([booksTypes.LOAD_BOOKS_FAILURE]);


class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array,
    isLoading: PropTypes.bool,
    loadBooks: PropTypes.func,
    loadError: PropTypes.string
  }

  state = {
    availableCategoryFilters: {},
    bookCategoryFilter: '',
    sortBy: 'title',
    sortDirection: 'asc',
    viewType: 'grid'
  }

  componentWillReceiveProps(nextProps) {
    const books = nextProps.books;
    const {
      sortBy,
      sortDirection,
      filter: bookCategoryFilter,
      viewType
    } = queryString.parse(nextProps.location.search);

    const availableCategoryFilters = {};

    books.forEach(({ category }) => {
      if(availableCategoryFilters[category]) {
        return;
      }
      return availableCategoryFilters[category] = category;
    });

    this.setState({
      availableCategoryFilters,
      bookCategoryFilter,
      sortDirection,
      sortBy,
      viewType
    });
  }

  componentDidMount() {
    this.props.loadBooks();
  }

  handleViewTypeToogle = (selectedViewType) => {
    this.setState({ viewType: selectedViewType });
  }

  handleCategoryFilterChange = (selectedCategoryFilter) => {
    this.setState({ bookCategoryFilter: selectedCategoryFilter });
  }

  handleSortByChange = (selectedSortBy) => {
    this.setState({ sortBy: selectedSortBy.id });
  }

  handleSortDirectionChange = (selectedSortDirection) => {
    this.setState({ sortDirection: selectedSortDirection.id })
  };

  handleReset = (e) => {
    e.preventDefault();
    this.setState({
      bookCategoryFilter: '',
      sortBy: 'title',
      sortDirection: 'asc',
      viewType: 'grid'
    })
  }

  getHeader = () => {
    return (
      <header>
        <h1>Book Library</h1>
        <Link to="/books/new">New book</Link>
      </header>
    );
  }

  getBookListControls = () => {
    return (
      <div>
        <ViewToggle
          handleViewTypeToogle={ this.handleViewTypeToogle }
          viewType={ this.state.viewType }
        />
        <BookFilterSelector
          availableCategoryFilters={ this.state.availableCategoryFilters }
          bookCategoryFilter={ this.state.bookCategoryFilter }
          handleCategoryFilterChange={ this.handleCategoryFilterChange }
        />
        <SortBySelector
          handleSortByChange={ this.handleSortByChange }
          sortBy={ this.state.sortBy }
        />
        <SortDirectionSelector
          handleSortDirectionChange={ this.handleSortDirectionChange }
          sortDirection={ this.state.sortDirection }
        />
        <button type="button" onClick={ this.handleReset }>Reset</button>
      </div>
    );
  }

  getBooks = (filteredBooks) => {
    const bookItems = filteredBooks.map(book => {
      return this.state.viewType === 'grid' ?
        <BookGridItem key={ book.id } book={ book }/> :
        <BookListItem key={ book.id } book={ book }/>
    });

    return <ol>{ bookItems }</ol>;
  }

  render () {
    const filteredBooks = booksSelectors.getFilteredBooks(this.props.books, this.state.bookCategoryFilter);
    const sortedBooks = booksSelectors.getSortedBooks(filteredBooks, this.state.sortBy, this.state.sortDirection);

    if(this.props.error) {
      return <ErrorDisplay />;
    }

    if(this.props.isLoading) {
      return <Loader />;
    }

    if(!sortedBooks.length) {
    return <EmptyBooks />;
    }

    return (
      <div>
        { this.getHeader() }
        { this.getBookListControls() }
        { this.getBooks(sortedBooks) }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const books = booksSelectors.getBooksSelector(state);

  return {
    books,
    isLoading: books.length ? resultsLoadingSelector(state) : true,
    loadError: resultsErrorSelector(state)
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadBooks: () => dispatch(booksActions.loadBooks())
});

export {
  ListBooks
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBooks);
