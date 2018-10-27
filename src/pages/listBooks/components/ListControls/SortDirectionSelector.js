import React from 'react';
import PropTypes from 'prop-types';

const sortDirectionOptions = [
  { id: 'asc', displayType: 'Ascending' },
  { id: 'desc', displayType: 'Descending' }
];

const SortDirectionSelector = ({ handleSortDirectionChange, sortDirection }) => {
  const handleOnChange = (e) => {
    e.preventDefault();

    const optionIndex = e.target.selectedIndex;
    const selectedSortDirection = sortDirectionOptions[optionIndex];

    handleSortDirectionChange(selectedSortDirection)
  }
  return (
    <div>
      <label htmlFor="sort-direction-selector">Sort Direction</label>
      <select id="sort-direction-selector" value={ sortDirection } onChange={ handleOnChange }>
        {
          sortDirectionOptions.map(option => {
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

SortDirectionSelector.propTypes = {
  handleSortDirectionChange: PropTypes.func,
  sortDirection: PropTypes.string,
}

export default SortDirectionSelector;
