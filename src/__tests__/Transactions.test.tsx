import '@testing-library/jest-dom';

import * as React from 'react';
import {render, fireEvent, screen, waitFor } from '@testing-library/react';

import Transactions from '../views/Transactions/Transactions';
import TransactionContext from '../components/TransactionContext/TransactionContext';

jest.mock('../lib/firebase');

test('add new transaction', async () => {
    render(
        <TransactionContext>
            <Transactions view={'table'} />
        </TransactionContext>
    );

    await waitFor(() => expect(screen.getByText('Add transaction')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Add transaction'));

    await waitFor(() => expect(screen.getByTestId('edit-name')).toBeInTheDocument());


    fireEvent.change(screen.getByTestId('edit-name'), { target: { value: 'A new transaction' }});

    fireEvent.change(screen.getByTestId('edit-amount'), { target: { value: 2222 }});

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() =>  expect(screen.getAllByTestId('row-name')[0]).toHaveTextContent('A new transaction'));
});
