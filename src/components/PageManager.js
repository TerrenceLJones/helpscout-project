import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ListBooks from 'pages/listBooks';
import BookDetails from 'pages/bookDetails';
import CreateBook from 'pages/createBook';
import EditBook from 'pages/editBook';
import NoMatch from 'pages/NoMatch';

const PageManager = () => {
  return (
    <Switch>
        <Route exact path="/books" component={ ListBooks } />
        <Route path="/books/new" component={ CreateBook } />
        <Route path="/books/:id/edit" component={ EditBook } />
        <Route path="/books/:id" component={ BookDetails } />
        <Route component={NoMatch} />
    </Switch>
  );
}

export default PageManager;
