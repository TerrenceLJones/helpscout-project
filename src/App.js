import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

const books = [];

const Books = () => {
  if (!books.length) {
    return <EmptyView />;
  }

  return <h1>Books</h1>
}

const EmptyView = () => (
  <div>
    <h1>You haven&#39;t created any books yet.</h1>
    <Link to="/create">Create a new book</Link>
  </div>
);

const CreateBook = () => (
  <div>
    <h1>Create a New Book</h1>
  </div>
);

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
