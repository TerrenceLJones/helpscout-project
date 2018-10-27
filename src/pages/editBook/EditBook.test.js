import React from 'react';
import { shallow } from 'enzyme';

import { EditBook } from './EditBook';


it('renders without crashing', () => {
    expect(shallow(<EditBook
        loadBook={ jest.fn() }
        deleteBook={ jest.fn() }
        updateBook={ jest.fn() }
    />)).toMatchSnapshot();
});

it('display correct display when data is loading', () => {});
it('display correct display when there is an error', () => {});
it('display correct display when book is not found', () => {});
it('navigates to updated book after submission', () => {});
it('navigates to books list after book deletion', () => {});
