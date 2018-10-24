import React, { Component } from 'react';

export default class CreateBook extends Component {
  state = {
    title: '',
    category: '',
    image: ''
  }

  cancelAdd = () => {
    this.props.history.goBack();
  };

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
    console.log(this.state);
  }

  getImagePreview = () => {
    let { imagePreviewUrl } = this.state;

    if (!imagePreviewUrl) {
      return <div>Please select an Image for Preview</div>;
    }

    return <img src={ imagePreviewUrl } alt="Your book's cover image."/>;
  }

  render() {
    return (
      <div>
        <h1>Create a New Book</h1>

        <button onClick={ this.cancelAdd }>Cancel</button>

        <form onSubmit={ this.handleSubmit }>

          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={ this.state.title }
            onChange={ this.handleTitleChange }
          />

          <label htmlFor="category">Category</label>
          <input type="text"
            id="category"
            value={ this.state.category }
            onChange={ this.handleCategoryChange }
          />

          { this.getImagePreview() }

          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={ this.handleImageChange }
          />

          <button type="submit">Create Book</button>
        </form>
      </div>
    );
  }
};
