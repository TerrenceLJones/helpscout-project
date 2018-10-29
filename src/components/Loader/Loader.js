import React from 'react';

import spinner from 'components/Loader/spinner.svg';
import styles from 'components/Loader/Loader.module.css'

const Loader = () => (
  <div className={ `${styles.loaderContainer}` }>
    <img src={spinner} alt="Loading animation"/>
  </div>
);

export default Loader;
