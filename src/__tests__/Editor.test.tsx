import '@testing-library/jest-dom';

import * as React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';

import TransactionEditor from '../components/TransactionEditor/TransactionEditor';

test('epoch is parsed to yyyy-mm-dd', () => {
    const { container } = render(
        <TransactionEditor 
            transaction={{
                id: 'test-id',
                date: 1666687856,
                name: 'Test transaction',
                amount: 444
            }}
            onSave={() => {}}
            onCancel={() => {}}
        />
    );

    expect(container.querySelector('[name="date"')).toHaveValue('2022-10-25');
});

test('initial state has todays date', () => {
    const onSave = jest.fn(); 
    render(
        <TransactionEditor 
            onSave={onSave}
            onCancel={() => {}}
        />
    );

    fireEvent.click(screen.getByText('Save'));

    expect(onSave).toHaveBeenCalledWith({
        name: '',
        date: new Date().toISOString().substring(0,10),
        amount: 0
    });
});

test('new transaction has correct form', () => {
    const onSave = jest.fn(); 
    render(
        <TransactionEditor 
            onSave={onSave}
            onCancel={() => {}}
        />
    );

    fireEvent.change(screen.getByTestId('edit-name'), { target: { value: 'My new name' }});

    fireEvent.change(screen.getByTestId('edit-amount'), { target: { value: 567 }});

    fireEvent.change(screen.getByTestId('edit-date'), { target: { value: '2022-02-15' }});

    fireEvent.click(screen.getByText('Save'));

    expect(onSave).toHaveBeenCalledWith({
        name: 'My new name',
        date: '2022-02-15',
        amount: '567'
    });
});