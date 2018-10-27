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

export {
  createBook
};
