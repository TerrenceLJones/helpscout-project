import React, { Component } from 'react';
import PropTypes from 'prop-types';

const BookForm = class BookForm extends Component {
  static propTypes = {
    book: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func
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
        image: book.image,
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
        image: reader.result,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.props.handleSubmit(this.state);
  }

  getImagePreview = () => {
    let { imagePreviewUrl } = this.state;

    if (!imagePreviewUrl) {
      return <div>Please select an Image for Preview</div>;
    }

    return <img src={ imagePreviewUrl } alt="Your book&#39;s cover."/>;
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

    return (
      <button
        type="button"
        onClick={ () => this.props.handleDelete(this.state.id) }>
        Delete
      </button>);
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.onSubmit }>

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

export {
  BookForm
}

export default BookForm;
