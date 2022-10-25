export interface Transaction {
    id: string;
    amount: number;
    date: number; // Unix epoch date
    name: string;
}

export type Sort = {
    field: keyof Transaction;
    direction: SortDirections
};

export type SortDirections = 'asc' | 'desc';

export type View = 'table' | 'pretty';

export type TransactionContext = {
    transactions: Transaction[];
    currentSort: Sort;
    sortList: (field: keyof Transaction, direction: SortDirections) => void;
    addTransaction: (doc: Transaction) => Promise<boolean | Transaction>;
    deleteTransaction:  (doc: Transaction) => Promise<boolean>;
    updateTransaction: (doc: Transaction) => Promise<boolean | Transaction>;
    load: () => Promise<boolean>;
};