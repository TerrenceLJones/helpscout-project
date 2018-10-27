import React from 'react';
import PropTypes from 'prop-types';

const sortByOptions = [
  { id: 'title', displayType: 'Title' },
  { id: 'category', displayType: 'Category' },
  { id: 'author', displayType: 'Author' },
  { id: 'createdAt', displayType: 'Date Added' }
];

const SortBySelector = ({ handleSortByChange, sortBy }) => {
  const handleOnChange = (e) => {
    e.preventDefault();

    const optionIndex = e.target.selectedIndex;
    const selectedSortBy = sortByOptions[optionIndex];

    handleSortByChange(selectedSortBy)
  }
  return (
    <div>
      <label htmlFor="sort-selector">Sort By</label>
      <select id="sort-selector" value={ sortBy } onChange={ handleOnChange }>
        {
          sortByOptions.map(option => {
            return (
              <option key={ option.id } value={ option.id }>
                { option.displayType }
              </option>
            );
          })
        }
      </select>
    </div>
  );
};

SortBySelector.propTypes = {
  handleSortByChange: PropTypes.func,
  sortBy: PropTypes.string,
}

export default SortBySelector;
