import React, { Component } from 'react';

import { UnknownBook } from 'components/UnknownBook';
import EditBookForm from 'components/BookForm';

import books from 'data/bookData';

export default class CreateBook extends Component {
  state = {}

  componentDidMount = () => {
    const { match: { params } } = this.props;
    const bookId = params.id;
    const book = books[bookId];

    if(book) {
      this.setState({ book });
    }
  }

  render() {
    if(!this.state.book) {
      return <UnknownBook />
    }

    return <EditBookForm book={ this.state.book } />;
  }
};
