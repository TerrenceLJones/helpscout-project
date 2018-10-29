import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <div className="jumbotron">
      <div className="container">
        <header className="d-flex justify-content-between align-items-center">
          { props.children }
        </header>
      </div>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.array
};

export default Header;
