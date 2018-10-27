import { v1 as uuid } from 'uuid';

const createBook = data => {
  const parsedbookData = JSON.parse(localStorage.getItem('bookData'));
  const newItem = {
    ...data,
    id: uuid(),
    createdAt: Date.now()
  };

  localStorage.setItem('bookData', JSON.stringify({
    ...parsedbookData,
    [newItem.id]: newItem
  }));

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(newItem), 1000)
  });
};

const loadAll = () => {
  return new Promise((resolve, reject) => {
    const parsedData = JSON.parse(localStorage.getItem('bookData'));
    setTimeout(() => resolve(parsedData), 2000)
  });
}

const loadOne = id => {
  return new Promise((resolve, reject) => {
    if(!id) {
      reject(TypeError('Must provide an id.'));
    }

    const parsedBookData = JSON.parse(localStorage.getItem('bookData'));
    const foundItem = parsedBookData.find(book => book.id === id);

    setTimeout(() => {
      if(!foundItem) {
        reject('Not found.')
      }
      resolve(foundItem)
    }, 2000)
  });
}

export {
  createBook,
  loadAll,
  loadOne
};
