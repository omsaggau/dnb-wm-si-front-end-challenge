import { createContext } from 'react';
import useTransactions, { DEFAULT_SORT } from '../../hooks/useTransactionsFirebase';
import { TransactionContext } from '../../types';

const Context = createContext<TransactionContext>({
    currentSort: DEFAULT_SORT,
    transactions: [],
    sortList: () => {},
    load: () => new Promise<boolean>((resolve) => {}),
    addTransaction: () => new Promise<boolean>((resolve) => {}),
    deleteTransaction: () => new Promise<boolean>((resolve) => {}),
    updateTransaction: () => new Promise<boolean>((resolve) => {})
});

type IProps = {
    children: React.ReactNode
};

const ContextWrapper = ({ children }: IProps) => {
    const data = useTransactions();

    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    );
};

export default ContextWrapper;

export {
    Context as TransactionContext
};