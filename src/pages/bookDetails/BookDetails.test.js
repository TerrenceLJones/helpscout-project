import React from 'react';
import { shallow } from 'enzyme';

import { BookDetails } from './BookDetails';


it('renders without crashing', () => {
    expect(shallow(<BookDetails loadBook={ jest.fn() } />)).toMatchSnapshot();
});

it('display correct display when data is loading', () => {});
it('display correct display when there is an error', () => {});
it('display correct display when book is not found', () => {});
it('navigates to updated book after submission', () => {});
