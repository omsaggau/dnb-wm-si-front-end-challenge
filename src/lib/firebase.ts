import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, addDoc, doc, setDoc, query, orderBy, startAfter, limit, QueryConstraint, CollectionReference } from 'firebase/firestore/lite';
import { Transaction, Sort } from '../types';
import { createTransactionData } from '../data';
import firebaseConfig from './firebaseConfig';

const COLLECTION = 'transactions';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const initData = () => {
    const data = createTransactionData();
    data.forEach(transaction => {
        setDoc(doc(db, COLLECTION, transaction.id), transaction);
    });
};

type getProps = {
    sort: Sort;
    lastDoc?: Transaction; // Pagination done by sending in value of last doc to start after
    count: number;
};

const getTransactions = async ({ sort, lastDoc, count }: getProps) => {
    const col = collection(db, COLLECTION);

    const args: [colRef: CollectionReference, ...queryConstraints: QueryConstraint[]] = [col, orderBy(sort.field, sort.direction), limit(count)];

    if (lastDoc?.[sort.field]) {
        args.push(startAfter(lastDoc[sort.field]));
    }
    const q = query(...args);
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map<Transaction>(doc => doc.data() as Transaction);
    return list;
};

const addTransaction = async (data: Transaction) => {
    const newDoc = await addDoc(collection(db, COLLECTION), data);

    if (newDoc.id) return data;

    return false;
};

const updateTransaction = async (data: Transaction) => {
    try {
        await setDoc(doc(db, COLLECTION, data.id), data);
        
        return data;
    } catch (err) {
        return false;
    }
};

const deleteTransaction = async (data: Transaction) => {
    try {
        await deleteDoc(doc(db, COLLECTION, data.id));

        return true;
    } catch (err) {
        return false;
    }
};

export {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
};