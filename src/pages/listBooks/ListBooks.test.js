import React from 'react';
import { shallow } from 'enzyme';
import { ListBooks } from './ListBooks';

it('renders without crashing', () => {
  expect(shallow(<ListBooks
      books={ [] }
      history={ { push: jest.fn() } }
      loadBooks={ jest.fn() }
      location={ { search: {} } }
      isLoading={ false }
      loadError={ '' }
  />)).toMatchSnapshot();
});

it('sets correct state based on url query string', () => {});
it('sets correct availableCategoryFilters state for given books', () => {});

it('display correct display when data is loading', () => {});
it('display correct display when there is an error', () => {});
it('display correct display when book is not found', () => {});
