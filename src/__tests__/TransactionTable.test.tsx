import '@testing-library/jest-dom';

import * as React from 'react';
import {render, fireEvent, screen, waitFor } from '@testing-library/react';

import TransactionTable from '../components/TransactionTable/TransactionTable';
import TransactionContext from '../components/TransactionContext/TransactionContext';
import { DEFAULT_COUNT } from '../hooks/useTransactionsFirebase';

jest.mock('../lib/firebase');

test('get default count of rows', async () => {
    render(
        <TransactionContext>
            <TransactionTable 
                handleAdd={() => {}}
            />
        </TransactionContext>
    );

    await waitFor(() => expect(screen.getByTestId('list').children.length).toEqual(DEFAULT_COUNT));
});


test('default sort is date desc', async () => {
    render(
        <TransactionContext>
            <TransactionTable 
                handleAdd={() => {}}
            />
        </TransactionContext>
    );

    await waitFor(() => expect(screen.getAllByTestId('row-date').map(e => e.textContent)).toEqual([
        '13/01/2022',
        '28/12/2021',
        '23/12/2021',
        '26/11/2021',
    ]));
});

test('sort to date asc', async () => {
    render(
        <TransactionContext>
            <TransactionTable 
                handleAdd={() => {}}
            />
        </TransactionContext>
    );

    fireEvent.click(screen.getByText('Date'));


    await waitFor(() => expect(screen.getAllByTestId('row-date').map(e => e.textContent)).toEqual([
        '21/09/2021',
        '04/10/2021',
        '09/10/2021',
        '26/10/2021',
    ]));
});


test('sort to amount desc', async () => {
    render(
        <TransactionContext>
            <TransactionTable 
                handleAdd={() => {}}
            />
        </TransactionContext>
    );

    fireEvent.click(screen.getByText('Amount'));

    await waitFor(() => expect(screen.getAllByTestId('row-amount').map(e => e.textContent)).toEqual([
        '1443 kr',
        '849 kr',
        '452.29 kr',
        '377 kr',
    ]));
});


test('sort to name desc', async () => {
    render(
        <TransactionContext>
            <TransactionTable 
                handleAdd={() => {}}
            />
        </TransactionContext>
    );

    fireEvent.click(screen.getByText('Name'));


    await waitFor(() => expect(screen.getAllByTestId('row-name').map(e => e.textContent)).toEqual([
        'YouTube Prem',
        'Vipps:Ruter',
        'Vipps *12345 Sodexo',
        'Telenor Norge As',
    ]));
});


test('change name of first', async () => {
    render(
        <TransactionContext>
            <TransactionTable 
                handleAdd={() => {}}
            />
        </TransactionContext>
    );

    await waitFor(() => expect(screen.getAllByText('Edit')[0]).toBeInTheDocument());


    fireEvent.click(screen.getAllByText('Edit')[0]);

    fireEvent.change(screen.getByTestId('edit-name'), { target: { value: 'My new name' }});

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() =>  expect(screen.getAllByTestId('row-name')[0]).toHaveTextContent('My new name'));
});

test('delete first', async () => {
    // Deleting 'My new name' from above ^
    render(
        <TransactionContext>
            <TransactionTable 
                handleAdd={() => {}}
            />
        </TransactionContext>
    );

    await waitFor(() => expect(screen.getAllByText('Delete')[0]).toBeInTheDocument());


    fireEvent.click(screen.getAllByText('Delete')[0]);

    fireEvent.click(screen.getAllByText('Delete')[1]);

    await waitFor(() =>  expect(screen.getAllByTestId('row-name')[0]).toHaveTextContent('Telenor Norge As'));
});
