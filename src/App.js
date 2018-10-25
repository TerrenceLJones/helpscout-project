import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Books } from './Books';
import { BookDetails } from './BookDetails';
import CreateBook from './CreateBook';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/books" component={ Books } />
            <Route path="/books/:id" component={ BookDetails } />
            <Route path='/create' component={ CreateBook } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
