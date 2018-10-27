import React from 'react';
import { shallow } from 'enzyme';

import { CreateBook } from './CreateBook';


it('renders without crashing', () => {
  expect(shallow(<CreateBook
    createBook={ jest.fn() }
    history={ { replace: jest.fn() } }
  />)).toMatchSnapshot();
});

it('navigates to book details after submission', () => {});
