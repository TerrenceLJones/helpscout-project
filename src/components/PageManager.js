import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Books } from 'pages/Books';
import { BookDetails } from 'pages/BookDetails';
import CreateBook from 'pages/createBook';
import EditBook from 'pages/EditBook';


const PageManager = () => {
  return (
    <Switch>
        <Route exact path="/books" component={ Books } />
        <Route path='/books/new' component={ CreateBook } />
        <Route path="/books/:id/edit" component={ EditBook } />
        <Route path="/books/:id" component={ BookDetails } />
    </Switch>
  );
}

export default PageManager;
