import React from 'react';
import PropTypes from 'prop-types';

const BookFilterSelector = ({ availableCategoryFilters, bookCategoryFilter, handleCategoryFilterChange }) => {
  const handleOnChange = (e) => {
    e.preventDefault();

    handleCategoryFilterChange(e.target.value);
  };

  const getBookFilterOptions = () => {
    const options = [<option key="default" defaultValue>Select a category</option>];

    Object.keys(availableCategoryFilters).forEach(filter => {
      options.push(<option key={ filter } value={ filter }>{ filter }</option>);
    });

    return options
  };

  return (
    <div>
      <label htmlFor="filter-selector">Category Filter</label>
      <select
        id="filter-selector"
        onChange={ handleOnChange }
        value={ bookCategoryFilter }
      >
        { getBookFilterOptions() }
      </select>
    </div>
  );
}

BookFilterSelector.propTypes = {
  availableCategoryFilters: PropTypes.object,
  bookCategoryFilter: PropTypes.string,
  handleCategoryFilterChange: PropTypes.func
}

export default BookFilterSelector;
