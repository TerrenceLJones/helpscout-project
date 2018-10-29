import React from 'react';
import PropTypes from 'prop-types';

const ViewToggle = ({ className, onViewTypeToogle, viewType }) => {
  const onClick = (e) => {
    e.preventDefault();

    onViewTypeToogle(e.target.value);
  }

  return (
    <div className={`${className} mb-3`}>
      <label htmlFor="view-type" style={ { display: 'block'} }>View Type</label>
      <div className="btn-group" id="view-type">
        <button
          className={ `btn btn-outline-primary ${viewType === 'grid' ? 'active' : ''}` }
          onClick={ onClick }
          value="grid"
        >
          Grid
        </button>
        <button
          className={ `btn btn-outline-primary ${viewType === 'list' ? 'active' : ''}` }
          onClick={ onClick }
          value="list"
        >
          List
        </button>
      </div>
    </div>
  );
}

ViewToggle.propTypes = {
  className: PropTypes.string,
  onViewTypeToogle: PropTypes.func,
  viewType: PropTypes.string
}

export default ViewToggle;
