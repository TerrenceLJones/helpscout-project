import React from 'react';
import { Link } from 'react-router-dom';

const ErrorDisplay = ({ error }) => {
    return (
      <div className="text-center">
        <div className="cover-container d-flex flex-column">
          <div className="mt-5">
            <h3>Oops! Looks like something didn&#39;t work out according to plan.</h3>
            <h1>{ error }</h1>
            <p className="mt-3">
              <Link className="btn btn-success" to="/books">Return to books List</Link>
            </p>
          </div>
        </div>
      </div>
    )
};

export default ErrorDisplay;
