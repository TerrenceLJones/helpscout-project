import React from 'react';
import { shallow } from 'enzyme';
import { BooksList } from './ListBooks';

it('renders without crashing', () => {
  expect(shallow(<BooksList
      books={ [] }
      loadBooks={ jest.fn() }
      isLoading={ false }
      loadError={ '' }
  />)).toMatchSnapshot();
});

it('sets correct state based on url query string', () => {});
it('sets correct availableCategoryFilters state for given books', () => {});

it('display correct display when data is loading', () => {});
it('display correct display when there is an error', () => {});
it('display correct display when book is not found', () => {});
