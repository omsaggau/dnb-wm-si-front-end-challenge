import React, { useContext } from 'react';

import TransactionRow from '../TransactionRow/TransactionRow';
import { TransactionContext } from '../../components/TransactionContext/TransactionContext';
import { SortDirections, Transaction} from '../../types';

type IProps = {
    handleAdd: () => void;
};

const TransactionsTable = ({ handleAdd }: IProps) => {
    const { transactions, sortList, currentSort } = useContext(TransactionContext);

    const sortColumn = (field: keyof Transaction) => {
        let direction: SortDirections = 'desc';

        if (currentSort.field === field && currentSort.direction === 'desc') {
            direction = 'asc';
        }

        sortList(field, direction);
    };

    const getSortIcon = (field: keyof Transaction) => {
        if (currentSort.field === field) {
            if (currentSort.direction === 'asc') return 'fa-sort-up';
            return 'fa-sort-down';
        }

        return 'fa-sort';
    };

    return (
        <div className='bg-white shadow-lg p-5 py-10 md:p-10 rounded-3xl'>
            <div className='md:flex justify-between items-center'>
                <h1 className=' uppercase font-light text-4xl tracking-wider'>Transactions</h1>
                <button className='mt-5 md:mt-0 flex items-center py-2 px-4 rounded-3xl bg-slate-200 hover-grow-sm' onClick={() => handleAdd()}>
                    <i className='mr-2 fa fa-add'></i>
                    <span>Add transaction</span>
                </button>
            </div>
            <div className=' overflow-scroll'>
                <table className='mt-10 w-full border-collapse'>
                    <thead>
                        <tr className=' bg-slate-500 text-white'>
                            <th className='py-2 px-4 text-left  font-normal'>
                                <button 
                                    onClick={() => sortColumn('name')}
                                    className='uppercase flex items-center'
                                >
                                    Name
                                    <i className={`ml-3 fa ${getSortIcon('name')}`}></i>
                                </button>
                            </th>
                            <th className='py-2 px-4 text-right  font-normal'>
                                <button 
                                    onClick={() => sortColumn('amount')}
                                    className='uppercase flex justify-end w-full items-center'
                                >
                                    Amount
                                    <i className={`ml-3 fa ${getSortIcon('amount')}`}></i>
                                </button>
                            </th>
                            <th className='py-2 px-4 md:min-w-[150px] text-left  font-normal w-0'>
                                <button 
                                    onClick={() => sortColumn('date')}
                                    className='uppercase flex items-center'
                                >
                                    Date
                                    <i className={`ml-3 fa ${getSortIcon('date')}`}></i>
                                </button>
                            </th>
                            <th className='p-5 text-right uppercase  font-normal w-0'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='rounded-3xl overflow-hidden border-b border-slate-200' data-testid='list'>
                        {transactions.map((transaction, i) => (
                            <TransactionRow key={i + transaction.id} transaction={transaction} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionsTable;
