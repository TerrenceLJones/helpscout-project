import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Books } from './Books';
import { BookDetails } from './BookDetails';
import CreateBook from './CreateBook';
import EditBook from './EditBook';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/books" component={ Books } />
            <Route path='/books/new' component={ CreateBook } />
            <Route path="/books/:id/edit" component={ EditBook } />
            <Route path="/books/:id" component={ BookDetails } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
