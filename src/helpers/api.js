import _ from 'lodash';
import { v1 as uuid } from 'uuid';

const createBook = data => {
  // Fetch data from localStorage or set to empty array
  const parsedbookData = JSON.parse(localStorage.getItem('bookData')) || [];
  const newItem = {
    ...data,
    id: uuid(),
    createdAt: Date.now()
  };

  const updateData = [...parsedbookData, newItem ];

  localStorage.setItem('bookData', JSON.stringify(updateData));

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(newItem), 1000)
  });
};

const loadAll = () => {
  return new Promise((resolve, reject) => {
    const parsedData = JSON.parse(localStorage.getItem('bookData'));
    setTimeout(() => resolve(parsedData), 1000)
  });
}

const loadOne = id => {
  return new Promise((resolve, reject) => {
    if(!id) {
      reject(TypeError('Must provide an id.'));
    }

    const parsedBookData = JSON.parse(localStorage.getItem('bookData'));
    const foundItem = _.find(parsedBookData, { id: id });

    setTimeout(() => {
      if(!foundItem) {
        reject('Not found.')
      }
      resolve(foundItem)
    }, 1000)
  });
}

const updateBook = data => {
  return new Promise((resolve, reject) => {
    const parsedData = JSON.parse(localStorage.getItem('bookData'));
    const foundItemIndex = _.findIndex(parsedData, dataEntry => dataEntry.id === data.id);
    const foundItem = parsedData[foundItemIndex];

    setTimeout(() => {
      if(!foundItem) {
        reject('Not found.')
      }

      const updatedItem = { ...foundItem, ...data };
      const updatedData = [ ...parsedData ];
      updatedData[foundItemIndex] = updatedItem

      localStorage.setItem('bookData', JSON.stringify(updatedData));

      resolve(updatedItem);
    }, 1000)
  });
};

const deleteBook = id => {
  return new Promise((resolve, reject) => {
    const parsedData = JSON.parse(localStorage.getItem('bookData'));
    const filteredData = parsedData.filter((dataEntry) => dataEntry.id !== id);

    setTimeout(() => {
      localStorage.setItem('bookData', JSON.stringify({ ...filteredData }));
      resolve();
    }, 1000)
  });
};

export {
  createBook,
  updateBook,
  deleteBook,
  loadAll,
  loadOne
};
