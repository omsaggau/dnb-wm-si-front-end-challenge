import React from 'react';

import './TransactionListItem.css'
import { Transaction } from '../../types';

interface Props {
    transaction: Transaction;
}

const TransactionListItem = ({ transaction }: Props) => (
    <div className="transaction-list-item">
        <div>{transaction.name}</div>
        <div>{transaction.date}</div>
        <div>{transaction.amount} kr</div>
        <div><button onClick={() => {}}>Edit</button></div>
    </div>
);

export default TransactionListItem;
