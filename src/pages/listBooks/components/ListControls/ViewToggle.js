import React from 'react';
import PropTypes from 'prop-types';

const viewOptions = [
  { id: 'grid', displayType: 'Grid' },
  { id: 'list', displayType: 'List' }
];

const ViewToggle = ({ handleViewTypeToogle, viewType }) => {
  const handleOnChange = (e) => {
    e.preventDefault();
    const optionIndex = e.target.selectedIndex;
    const selectedViewType = viewOptions[optionIndex];

    handleViewTypeToogle(selectedViewType.id);
  }

  const getViewOptions = () => {
    return viewOptions.map(option => {
      return (
        <option
          key={ option.id }
          value={ option.id }
        >
          { option.displayType }
        </option>
      );
    });
  }

  return (
    <div>
      <label htmlFor="view-toggle">View Toggle</label>
      <select
        id="view-toggle"
        onChange={ handleOnChange }
        value={ viewType }
      >
        { getViewOptions() }
      </select>
    </div>
  );
}

ViewToggle.propTypes = {
  handleViewTypeToogle: PropTypes.func,
  viewType: PropTypes.string
}

export default ViewToggle;
