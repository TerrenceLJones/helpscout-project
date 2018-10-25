import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class BookForm extends Component {
  static propTypes = {
    book: PropTypes.object
  }

  state = {
    category: '',
    id: '',
    image: '',
    imagePreviewUrl: '',
    title: ''
  }

  componentDidMount() {
    const { book } = this.props;

    if(book) {
      this.setState({
        category: book.category,
        id: book.id,
        imagePreviewUrl: book.image,
        title: book.title
      });
    }
  }

  handleTitleChange = ({ target: { value } }) => {
    this.setState({ title: value })
  }

  handleCategoryChange = ({ target: { value } }) => {
    this.setState({ category: value })
  }

  handleImageChange = ({ target: { files } }) => {
    let reader = new FileReader();
    let file = files[0];

    reader.onloadend = () => {
      this.setState({
        image: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit', this.state);
  }

  handleDeleteBook = (e) => {
    e.preventDefault();
    console.log('handleDeleteBook', this.state);
  }

  getHeader() {
    const headerText = this.state.id ? 'Edit Book' : 'Create a New Book';

    return (
      <header>
        <h1>{ headerText }</h1>
        <Link to={ `/books/${this.state.id}` }>Cancel</Link>
      </header>
    );
  }

  getImagePreview = () => {
    let { imagePreviewUrl } = this.state;

    if (!imagePreviewUrl) {
      return <div>Please select an Image for Preview</div>;
    }

    return <img src={ imagePreviewUrl } alt="Your book&#39;s cover image."/>;
  }

  getSaveButton() {
    if(!this.state.id) {
      return <button type="submit">Create</button>;
    }

    return <button type="submit">Save</button>;
  }

  getDeleteButton() {
    if(!this.state.id) {
      return null;
    }

    return <button type="button" onClick={ this.handleDeleteBook }>Delete</button>;
  }

  render() {
    return (
      <div>
        { this.getHeader() }

        <form onSubmit={ this.handleSubmit }>

          <label htmlFor="title">Title</label>
          <input
            id="title"
            onChange={ this.handleTitleChange }
            type="text"
            value={ this.state.title }
          />

          <label htmlFor="category">Category</label>
          <input type="text"
            id="category"
            onChange={ this.handleCategoryChange }
            value={ this.state.category }
          />

          { this.getImagePreview() }

          <input
            accept="image/*"
            id="image"
            onChange={ this.handleImageChange }
            type="file"
          />

          { this.getSaveButton() }

          { this.getDeleteButton() }
        </form>
      </div>
    );
  }
}
