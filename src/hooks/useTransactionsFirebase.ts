import { useState, useCallback, useRef, useEffect } from 'react';
import { Sort, SortDirections, Transaction, TransactionContext } from '../types';
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from '../lib/firebase';

const DEFAULT_SORT: Sort = { field: 'date', direction: 'desc' };
const DEFAULT_COUNT = 4; // per page

const useTransactions = (): TransactionContext => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const currentSort = useRef<Sort>(DEFAULT_SORT);

    const loadInitial = useCallback(async () => {
        const list = await getTransactions({ sort: DEFAULT_SORT, count: DEFAULT_COUNT });
        setTransactions(list);
    }, []);
  

    const sortList = useCallback(async (field: keyof Transaction, direction: SortDirections) => {
        currentSort.current = {
            field,
            direction
        };
        
        const sortedList = await getTransactions({ sort: currentSort.current, count: DEFAULT_COUNT });

        setTransactions(sortedList);
    }, []);

    const add = useCallback(async (doc: Transaction) => {
        const newDoc = await addTransaction(doc);

        if (newDoc) {
            currentSort.current = DEFAULT_SORT;
            loadInitial();
        }

        return newDoc;
    }, [loadInitial]);

    const update = useCallback(async (doc: Transaction) => {
        const updatedDoc = await updateTransaction(doc);

        if (updatedDoc) {
            // Get fresh sorted list. Updated item might have changed position in list
            const updatedList = await getTransactions({ sort: currentSort.current, count: transactions.length });
            setTransactions(updatedList);
        }

        return updatedDoc;
    }, [transactions]);

    const deleteDoc = useCallback(async (doc: Transaction) => {
        const didDelete = await deleteTransaction(doc);

        if (didDelete) {
            // Get fresh sorted list
            const updatedList = await getTransactions({ sort: currentSort.current, count: transactions.length });
            setTransactions(updatedList);
        }

        return didDelete;
    }, [transactions]);


    /**
     * Only have loading of next page. Getting a total page count in firebase is costly or have to program own counter. 
     * Need total pages to support loading a select page. TODO
     */
    const load = useCallback(async () => {
        const last = transactions[transactions.length - 1];
        const nextBatch = await getTransactions({ sort: currentSort.current, count: DEFAULT_COUNT, lastDoc: last });
        if (nextBatch.length > 0) setTransactions([...transactions, ...nextBatch]);

        return nextBatch.length > 0;
    }, [transactions]);

    useEffect(() => {
        loadInitial();
    }, [loadInitial]);

    return {
        transactions, 
        sortList, 
        currentSort: currentSort.current,
        addTransaction: add,
        updateTransaction: update,
        deleteTransaction: deleteDoc,
        load
    };
};

export default useTransactions;

export {
    DEFAULT_COUNT,
    DEFAULT_SORT
};