import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Books } from './Books';
import CreateBook from './CreateBook';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ Books } />
            <Route path='/create' component={ CreateBook } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
