import React from 'react';

import './TransactionsList.css';
import TransactionListItem from '../TransactionListItem/TransactionListItem';
import {Transaction} from '../../types'

interface Props {
    transactions: Transaction[];
}

const TransactionsList = ({ transactions }: Props) => (
    <div className="container">
        <div className="header">Transactions:</div>

        <div>
            {transactions.map((transaction, i) => (<TransactionListItem key={i} transaction={transaction} />))}
        </div>
    </div>
);

export default TransactionsList;
