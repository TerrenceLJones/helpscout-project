const getPlaceHolderImageUrl = (bookTitle) => {
  const placeholderImageText = bookTitle ? bookTitle.replace(/\s/g, '+') : 'Book Cover';

  return `https://dummyimage.com/231x350/000/ffffff.png&text=${placeholderImageText}`;
}

export {
  getPlaceHolderImageUrl
}
