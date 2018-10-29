import React from 'react';
import { shallow } from 'enzyme';

import { BookForm } from './BookForm';


it('renders without crashing', () => {
    expect(shallow(<BookForm
        book={ {} }
        onSubmit={ jest.fn() }
        onDelete={ jest.fn() }
    />)).toMatchSnapshot();
});

it('calls handleSubmit after triggering submit', () => {});
it('calls handleDelete after triggering delete', () => {});
