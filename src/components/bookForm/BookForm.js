import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from 'components/bookForm/BookForm.module.css';

import { getPlaceHolderImageUrl } from 'helpers/placeHolderImage';

const BookForm = class BookForm extends Component {
  static propTypes = {
    book: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    ondDelete: PropTypes.func
  }

  state = {
    author: '',
    category: '',
    id: '',
    image: '',
    imagePreviewUrl: '',
    title: ''
  }

  constructor(props) {
    super(props)

    this.imageUploaderRef = React.createRef();
  }

  componentDidMount() {
    const { book } = this.props;

    if(book) {
      this.setState({
        author: book.author,
        category: book.category,
        id: book.id,
        image: book.image,
        imagePreviewUrl: book.image,
        title: book.title
      });
    }
  }

  handleAuthorChange = ({ target: { value } }) => {
    this.setState({ author: value })
  }

  handleTitleChange = ({ target: { value } }) => {
    this.setState({ title: value })
  }

  handleCategoryChange = ({ target: { value } }) => {
    this.setState({ category: value })
  }

  handleAddBookCover = () => {
    const node = this.imageUploaderRef.current;

    if(node) {
      node.click();
    }
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

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state);
  }

  getImagePreview = () => {
    const { imagePreviewUrl } = this.state;
    const title = this.props.book && this.props.book.title;
    const backgroundImage = imagePreviewUrl || getPlaceHolderImageUrl(title);
    const containerClasses = classNames(styles.container, 'card shadow-sm');
    const imagePreviewClasses = classNames(styles.linkButton, styles.image);
    const imagePreviewButtonClasses = classNames(styles.linkButton, styles.buttonText);

    return(
      <div className={ containerClasses }>
        <div className={ styles.imageContainer }>
          <button
            style={ { backgroundImage: `url("${backgroundImage}")` } }
            className={ imagePreviewClasses }
            type="button"
            onClick={ this.handleAddBookCover }
          />
        </div>

        <div className="card-body">
          <input
            accept="image/*"
            className={ styles.bookImageAddButton }
            id="image"
            onChange={ this.handleImageChange }
            ref={ this.imageUploaderRef }
            style={ { display: 'none' } }
            type="file"
          />

          <button
            className={ imagePreviewButtonClasses }
            type="button"
            onClick={ this.handleAddBookCover }
          >
            Add Book Cover
          </button>
        </div>
      </div>
    );
  }

  getSaveButton() {
    const text = this.state.id ? 'Save' : 'Create'

    return <button className="btn btn-success btn-block" type="submit">{ text }</button>;
  }

  getDeleteButton() {
    if(!this.state.id) {
      return null;
    }

    return (
      <button
        className="btn btn-danger btn-block"
        type="button"
        onClick={ () => this.props.onDelete(this.state.id) }>
        Delete
      </button>);
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>

          <div className="row mb-4">
            <div className="col-md-6 mb-4">
              { this.getImagePreview() }
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  className="form-control"
                  id="title"
                  onChange={ this.handleTitleChange }
                  type="text"
                  value={ this.state.title }
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Author</label>
                <input
                  className="form-control"
                  id="title"
                  onChange={ this.handleAuthorChange }
                  type="text"
                  value={ this.state.author }
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input type="text"
                  className="form-control"
                  id="category"
                  onChange={ this.handleCategoryChange }
                  value={ this.state.category }
                />
              </div>

              { this.getSaveButton() }
              { this.getDeleteButton() }

            </div>
          </div>
        </form>
      </div>
    );
  }
}

export {
  BookForm
}

export default BookForm;
