import { createTransactionData } from '../../data';
import { Transaction, Sort, SortDirections } from '../../types';

import { DEFAULT_COUNT } from '../../hooks/useTransactionsFirebase';

type getProps = {
    sort: Sort;
    lastDoc?: Transaction; // Pagination done by sending in value of last doc to start after
    count: number;
};

let list: Transaction[] = [...createTransactionData()];

const sortTransactions = (transactions: Transaction[], field: keyof Transaction, direction: SortDirections) => {
    const sortedList = [...transactions].sort((a, b) => {
        if (a[field] < b[field]){
            return direction === 'asc' ? -1 : 1;
        }
        if (a[field] > b[field]){
            return direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return sortedList;
};


const getTransactions = async ({ sort, lastDoc, count }: getProps) => {
    list = sortTransactions(list, sort.field, sort.direction);
    
    return list.slice(0, DEFAULT_COUNT);
};

const addTransaction = async (data: Transaction) => {
    list.push(data);

    return data;
};

const updateTransaction = async (data: Transaction) => {
    const index = list.findIndex(t => t.id === data.id);

    if (!list[index]) return false;

    list[index] = data;
    return data;
};

const deleteTransaction = async (data: Transaction) => {
    const index = list.findIndex(t => t.id === data.id);
    if (list[index]) {
        const newList = [...list];
        newList.splice(index, 1);
        list = newList;
        return true;
    } else {
        return false;
    }
};

export {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
};