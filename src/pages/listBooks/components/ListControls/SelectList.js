import React from 'react';
import PropTypes from 'prop-types';


const SelectList = (props) => {
  const {
    classNames,
    defaultOptionText,
    label,
    onChangeHandler,
    options,
    selectedOption
  } = props;

  const getBookFilterOptions = () => {
    const defaultText = defaultOptionText || 'Select an option';
    const selectOpts = [<option key="default" value="reset" defaultValue>{ defaultText }</option>];

    options.forEach(option => {
      selectOpts.push(<option key={ option.id } value={ option.id }>{ option.label }</option>);
    });

    return selectOpts;
  };

  return (
    <div className={`${classNames} mb-3`}>
      <label htmlFor="filter-selector">{ label }</label>
      <select
        className="form-control btn btn-sm btn-outline-secondary"
        id="filter-selector"
        onChange={ (e) => onChangeHandler(e.target.value) }
        value={ selectedOption }
      >
        { getBookFilterOptions() }
      </select>

    </div>
  );
}

SelectList.propTypes = {
  classNames: PropTypes.string,
  defaultOptionText: PropTypes.string,
  label: PropTypes.string,
  onChangeHandler: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  selectedOption: PropTypes.string,
}

export default SelectList;
