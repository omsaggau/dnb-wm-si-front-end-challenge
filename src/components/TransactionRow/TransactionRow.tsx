import React, { useCallback, useContext, useState } from 'react';

import { Transaction } from '../../types';
import { TransactionContext } from '../TransactionContext/TransactionContext';
import TransactionEditor from '../TransactionEditor/TransactionEditor';

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB');

interface Props {
    transaction: Transaction;
}

type State = 'idle' | 'editing' | 'deleting';

const TransactionRow = ({ transaction }: Props) => {
    const { updateTransaction, deleteTransaction } = useContext(TransactionContext);
    const [state, setState] = useState<State>('idle');

    const save = useCallback(async (data: any) => {
        const newDoc: Transaction = {
            id: transaction.id,
            ...data,
            date: new Date(data.date).getTime() / 1000,
        };

        const response = await updateTransaction(newDoc);

        if (response) {
            setState('idle');
        }
    }, [transaction, updateTransaction]);;

    const deleteDoc = useCallback(async () => {
        const didDelete = await deleteTransaction(transaction);

        if (didDelete) {
            setState('idle');
        }
    }, [transaction, deleteTransaction]);

    const toggleEditing = useCallback(() => {
        setState(state === 'idle' ? 'editing' : 'idle');
    }, [state]);
    
    return (
        <>
            <tr className='odd:bg-slate-200 border-slate-200 border-x hover:bg-slate-300'>
                <td data-testid='row-name' className='py-2 px-4'>{transaction.name}</td>
                <td data-testid='row-amount' className='py-2 px-4 text-right font-mono'>{transaction.amount} kr</td>
                <td data-testid='row-date' className='py-2 px-4 md:min-w-[150px]'>{transaction.date && DATE_FORMAT.format(transaction.date * 1000)}</td>
                <td className='py-2 px-4 text-right text-slate-700'>
                    <div className='flex justify-end'>
                        <button className='flex items-center justify-center w-8 h-8 hover-grow-md' onClick={() => toggleEditing()} title='Edit'>
                            <span className='sr-only'>Edit</span>
                            <i className='fa fa-edit'></i>
                        </button>
                        <button className='flex items-center justify-center w-8 h-8 hover-grow-md' onClick={() => setState('deleting')} title='Delete'>
                            <span className='sr-only'>Delete</span>
                            <i className='fa fa-trash'></i>
                        </button>
                    </div>
                </td>
            </tr>
            {state === 'editing' && (
                <tr className='border-slate-200 border-x bg-slate-300'>
                    <td className='pb-10' colSpan={4}>
                        <div className='w-full bg-white p-5 shadow-lg'>
                            <TransactionEditor 
                                transaction={transaction}
                                onCancel={() => setState('idle')}
                                onSave={(data) => save(data)}
                            />
                        </div>
                    </td>
                </tr>
            )}
            {state === 'deleting' && (
                <tr className='border-slate-200 border-x bg-slate-300'>
                    <td className='pb-10' colSpan={4}>
                        <div className='w-full bg-white p-5 shadow-lg text-center'>
                            <div className='text-2xl'>Are you sure you want to delete this row?</div>
                            <div className='flex justify-center text-white space-x-5 mt-5'>
                                <button className='flex items-center py-2 px-4 rounded-3xl bg-slate-600 hover-grow-sm' onClick={() => setState('idle')}>
                                    <i className='mr-2 fa fa-close'></i>
                                    <span>Cancel</span>
                                </button>
                                <button className='flex items-center py-2 px-4 rounded-3xl bg-red-500 hover-grow-sm' onClick={() => deleteDoc()}>
                                    <i className='mr-2 fa fa-trash'></i>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};;

export default TransactionRow;
