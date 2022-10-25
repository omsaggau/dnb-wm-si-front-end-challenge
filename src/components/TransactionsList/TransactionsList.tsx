import React, { useContext } from 'react';


import TransactionListItem from '../TransactionListItem/TransactionListItem';
import { TransactionContext } from '../../components/TransactionContext/TransactionContext';
import { SortDirections, Transaction } from '../../types';

const TransactionsList = () => {
    const { transactions, sortList } = useContext(TransactionContext);

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [field, direction] = e.target.value.split('-') as [keyof Transaction, SortDirections];
        sortList(field, direction);
    };
    
    return (
        <div className=''>
            <div className='flex justify-between items-center'>
                <h1 className=' uppercase font-light text-4xl tracking-wider text-white'>Transactions</h1>
                <label className='flex items-center py-2 px-4 rounded-3xl bg-slate-200 hover-grow-sm'>
                    <i className='mr-2 fa fa-sort'></i>
                    <span className='mr-2'>Sort</span>

                    <select onChange={handleSort} defaultValue='date-desc'>
                        <option value='name-asc'>Name A-Z</option>
                        <option value='name-desc'>Name Z-A</option>
                        <option value='date-asc'>Date 1-9</option>
                        <option value='date-desc'>Date 9-1</option>
                    </select>
                </label>
            </div>

            <ul className='flex flex-wrap -mx-2 mt-5'>
                {transactions.map((transaction, i) => (
                    <li key={i + transaction.id} className='w-full md:w-1/2 p-2'>
                        <TransactionListItem transaction={transaction} />
                    </li>
                ))}
            </ul>
        </div>
    );
};;

export default TransactionsList;
