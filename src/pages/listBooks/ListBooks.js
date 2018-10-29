import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import _ from 'lodash';
import classNames from 'classnames';

import Header from 'components/Header';
import ErrorDisplay from 'components/ErrorDisplay';
import Loader from 'components/Loader';
import EmptyBooks from 'pages/listBooks/components/EmptyBooks';
import BookGridItem from 'pages/listBooks/components/BookGridItem';
import BookListItem from 'pages/listBooks/components/BookListItem';
import ListSelector from 'pages/listBooks/components/ListControls/SelectList';
import ViewToggle from 'pages/listBooks/components/ListControls/ViewToggle';

import styles from './ListBooks.module.css';

import { sortByOptions, sortDirectionOptions } from 'pages/listBooks/statics/listSelectOptions';
import { booksActions, booksSelectors, booksTypes } from 'state/modules/books';
import { apiSelectors } from 'state/modules/api'

const resultsLoadingSelector = apiSelectors.createLoadingSelector([booksTypes.LOAD_BOOKS_REQUEST]);
const resultsErrorSelector = apiSelectors.createErrorMessageSelector([booksTypes.LOAD_BOOKS_FAILURE]);


class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array,
    isLoading: PropTypes.bool,
    loadBooks: PropTypes.func,
    error: PropTypes.string
  }

  state = {
    categoryFilterOptions: [],
    bookCategoryFilter: '',
    sortBy: 'title',
    sortDirection: 'asc',
    viewType: 'grid'
  }

  constructor(props) {
    super(props);

    this.setUrlFromPropsOrState();
  }

  setUrlFromPropsOrState = () => {
    const searchObject = queryString.parse(this.props.location.search);

    const searchObjectFromState = {
      filter: _.get(searchObject, 'filter', this.state.bookCategoryFilter),
      sortDirection: _.get(searchObject, 'sortDirection',  this.state.sortDirection),
      sortBy: _.get(searchObject, 'sortBy', this.state.sortBy),
      viewType: _.get(searchObject, 'viewType', this.state.viewType)
    };

    this.updateSearchURL(searchObjectFromState);
  }

  static getDerivedStateFromProps(nextProps, state) {
    const books = nextProps.books;
    const {
      sortBy,
      sortDirection,
      filter: bookCategoryFilter,
      viewType
    } = queryString.parse(nextProps.location.search);

    const filterOptions = [];

    books.forEach(({ category }) => {
      // Prevent duplicate filters being added to filterOptions array.
      const existingFilter = _.find(filterOptions, { id: category });
      if(existingFilter) {
        return;
      }

      // Default to a category of `unknown` when one isn't set by user.
      const newFilter = { id: category, label: category || 'unknown' };
      filterOptions.push(newFilter);
    });

    return {
      categoryFilterOptions: filterOptions,
      bookCategoryFilter,
      sortDirection,
      sortBy,
      viewType
    };
  }

  componentDidMount() {
    this.props.loadBooks();
  }

  updateSearchItem(itemName, updatedValue) {
    const searchObject = queryString.parse(this.props.location.search);

    if(!updatedValue) {
      return _.omit(searchObject, itemName);
    }
    return { ...searchObject, [itemName]: updatedValue };
  }

  updateSearchURL(newSearchObject) {
    this.props.history.push(`/books/?${queryString.stringify(newSearchObject)}`);
  }

  onViewTypeToogle = selectedViewType => {
    const updatedSearchItem = this.updateSearchItem('viewType', selectedViewType);
    this.updateSearchURL(updatedSearchItem);
  }

  onCategoryFilterChange = (selectedCategoryFilter) => {
    const updatedSearchItem = this.updateSearchItem('filter', selectedCategoryFilter);
    this.updateSearchURL(updatedSearchItem);
  }

  onSortByChange = (selectedSortBy) => {
    const updatedSearchItem = this.updateSearchItem('sortBy', selectedSortBy);
    this.updateSearchURL(updatedSearchItem);
  }

  onSortDirectionChange = (selectedSortDirection) => {
    const updatedSearchItem = this.updateSearchItem('sortDirection', selectedSortDirection);
    this.updateSearchURL(updatedSearchItem);
  };

  handleResetBookFilter = () => {
    const updatedSearchItem = this.updateSearchItem('filter', '');
    this.updateSearchURL(updatedSearchItem);
  }

  getHeader = () => {
    return (
      <Header>
        <h1>Book Library</h1>
        <Link className="btn btn-success" to="/books/new">New book</Link>
      </Header>
    );
  }

  getBookListControls = () => {
    return (
      <div className="row">
        <ViewToggle
          className="col-md-2"
          onViewTypeToogle={ this.onViewTypeToogle }
          viewType={ this.state.viewType }
        />

        <ListSelector
          classNames="col-md-4"
          defaultOptionText="None"
          label="Category Filter"
          onChangeHandler={ this.onCategoryFilterChange }
          options={ this.state.categoryFilterOptions }
          selectedOption={ this.state.bookCategoryFilter }
        />

        <ListSelector
          classNames="col-md-3"
          label="Sort By"
          onChangeHandler={ this.onSortByChange }
          options={ sortByOptions }
          selectedOption={ this.state.sortBy }
        />

        <ListSelector
          classNames="col-md-3"
          label="Sort Direction"
          onChangeHandler={ this.onSortDirectionChange }
          options={ sortDirectionOptions }
          selectedOption={ this.state.sortDirection }
        />
      </div>
    );
  }

  getBooks = (filteredBooks) => {
    const isGrid = this.state.viewType === 'grid';
    const bookItems = filteredBooks.map(book => {
      return isGrid ?
        <BookGridItem key={ book.id } book={ book }/> :
        <BookListItem key={ book.id } book={ book }/>
    });
    const classes = classNames(styles.books, {
      'd-flex': isGrid,
      'row': !isGrid
    });

    return (
      <div className="py-3">
        <ol className={ classes }>
          { bookItems }
        </ol>
      </div>
    );
  }

  render () {
    const filteredBooks = booksSelectors.getFilteredBooks(this.props.books, this.state.bookCategoryFilter);
    const sortedBooks = booksSelectors.getSortedBooks(filteredBooks, this.state.sortBy, this.state.sortDirection);
    const error = this.props.error;

    if(error) {
      return <ErrorDisplay error={error} />;
    }

    if(this.props.isLoading) {
      return <Loader />;
    }

    if(!sortedBooks.length) {
    return <EmptyBooks />;
    }

    return (
      <div className="page">
        { this.getHeader() }
        <div className="container">
          { this.getBookListControls() }
          { this.getBooks(sortedBooks) }
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const books = booksSelectors.getBooksSelector(state);

  return {
    books,
    isLoading: books.length ? resultsLoadingSelector(state) : true,
    error: resultsErrorSelector(state)
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadBooks: () => dispatch(booksActions.loadBooks())
});

export {
  ListBooks
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBooks);
