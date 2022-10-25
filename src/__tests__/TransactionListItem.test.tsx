import '@testing-library/jest-dom';

import * as React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';

import TransactionListItem from '../components/TransactionListItem/TransactionListItem';

test('date is formated to long month', () => {
    render(
        <TransactionListItem 
            transaction={{
                id: 'test-id',
                date: 1666687856,
                name: 'Test transaction',
                amount: 444
            }}
        />
    );

    expect(screen.getByTestId('month')).toHaveTextContent('October 2022');
});
