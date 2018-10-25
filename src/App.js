import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import PageManager from 'components/PageManager';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <PageManager />
      </BrowserRouter>
    );
  }
}

export default App;
