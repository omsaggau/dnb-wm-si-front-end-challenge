/**
 * File for when using local list of transactions
 */

import { useState, useCallback, useRef } from 'react';
import { Sort, SortDirections, Transaction } from '../types';
import { createTransactionData } from '../data';

const DEFAULT_SORT: Sort = { field: 'date', direction: 'desc' };

/**
 * Sort a list of transactions by field and direction
 * @param transactions List of transactions
 * @param field Field of transaction object to sort on
 * @param direction Directions to sort, asc or desc
 * @returns Sorted list of transactions
 */
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

const INITIAL_DATA = sortTransactions(createTransactionData(), DEFAULT_SORT.field, DEFAULT_SORT.direction);

const useTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_DATA);
    const currentSort = useRef<Sort>(DEFAULT_SORT);

    const sortList = useCallback((field: keyof Transaction, direction: SortDirections) => {
        const sortedList = sortTransactions(transactions, field, direction);

        currentSort.current = {
            field,
            direction
        };

        setTransactions(sortedList);
    }, [transactions]);

    return {
        transactions, sortList, currentSort: currentSort.current
    };
};

export default useTransactions;