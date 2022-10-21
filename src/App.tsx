import React, { useState } from 'react';
import './App.css';
import TransactionsList from './components/TransactionsList/TransactionsList';
import { createTransactionData } from './data';
import { Transaction } from './types';

const App = () => {
    const [transactions] = useState<Transaction[]>(createTransactionData())

    return (
        <div className="app">
            <header className="app-header">
                DNB WM S&I Front-End Challenge
            </header>

            <TransactionsList transactions={transactions}/>
        </div>
    )
}

export default App;
