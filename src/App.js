import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import bootStrapData from 'data/bookData';

import configureStore from 'state/configureStore';

import PageManager from 'components/PageManager';

const hasData = !!localStorage.getItem('bookData')

// Only set `bookData` if not previously set
if(!hasData) {
  localStorage.setItem('bookData', JSON.stringify(bootStrapData));
}

const store = configureStore();

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <PageManager />
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
