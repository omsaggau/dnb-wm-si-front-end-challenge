import React, { useState } from 'react';
import './App.css';
import Toggle from './components/Toggle/Toggle';
import TransactionContext from './components/TransactionContext/TransactionContext';
import { View } from './types';
import Transactions from './views/Transactions/Transactions';

const App = () => {
    const [view, setView] = useState<View>('table');

    return (
        <TransactionContext>
            <div className='app bg-sky-200'>
                <header className='text-white md:h-24 mb-10 p-5 md:p-0'>
                    <div className='container flex md:items-center md:h-full md:justify-between flex-col md:flex-row'>
                        <span className='block font-light text-4xl'>
                            DNB WM S&I Front-End Challenge
                        </span>
                        <button onClick={() => setView(view === 'table' ? 'pretty' : 'table')} className='mt-5 md:mt-0 flex items-center font-light text-2xl'>
                            <span className='mr-2'>Table</span>
                            <Toggle checked={view === 'pretty'} />
                            <span className='ml-2'>Pretty</span>
                        </button>
                    </div>
                </header>
                <main className='mb-10'>
                    <Transactions view={view} />
                </main>
            </div>
        </TransactionContext>
    );
};

export default App;
