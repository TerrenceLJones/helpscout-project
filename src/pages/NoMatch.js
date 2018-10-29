import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div className="text-center">
      <div className="cover-container d-flex flex-column">
        <div className="mt-5">
          <h1>404</h1>
          <h3>Oops! Looks like something didn&#39;t work out according to plan.</h3>
          <p className="mt-3">
            <Link className="btn btn-success" to="/books">Take me to my books List</Link>
          </p>
        </div>
      </div>
    </div>
  )
};

export default NoMatch;