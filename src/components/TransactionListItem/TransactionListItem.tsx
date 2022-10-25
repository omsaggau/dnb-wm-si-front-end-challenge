import React from 'react';

import { Transaction } from '../../types';

const MONTH_FORMAT = new Intl.DateTimeFormat('en-GB', { month: 'long' });

interface Props {
    transaction: Transaction;
}

const TransactionListItem = ({ transaction }: Props) => {
    const date = new Date(transaction.date * 1000);
    
    return (
        <div className='p-5 bg-white shadow-lg rounded-3xl flex items-center justify-between'>
            <div>
                <div className='text-2xl mb-4'>{transaction.name}</div>
                <div>
                    <span className='rounded-full border w-8 h-8 mr-1 inline-flex justify-center items-center border-green-500'>
                        {date.getDate()}
                    </span>
                    <span data-testid='month'>{MONTH_FORMAT.format(date)} {date.getFullYear()}</span>
                </div>

            </div>
            <div>
                <span className='text-5xl'>
                    {transaction.amount} 
                </span>
                <span className='text-2xl'>
                    kr
                </span>
            </div>
        </div>
    );
};
export default TransactionListItem;
