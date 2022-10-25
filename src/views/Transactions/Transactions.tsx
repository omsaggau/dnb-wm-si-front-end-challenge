import { useCallback, useContext, useEffect, useState } from 'react';
import { TransactionContext } from '../../components/TransactionContext/TransactionContext';
import TransactionEditor from '../../components/TransactionEditor/TransactionEditor';
import TransactionsList from '../../components/TransactionsList/TransactionsList';
import TransactionsTable from '../../components/TransactionTable/TransactionTable';
import { guidGenerator } from '../../lib/utils';
import { Transaction, View } from '../../types';

type IProps = {
    view: View;
};

type State = 'idle' | 'creating';

const Transactions = ({ view }: IProps) => {
    const { transactions, load, addTransaction } = useContext(TransactionContext);
    const [isFinished, setIsFinished] = useState(false);
    const [state, setState] = useState<State>('idle');

    const doLoad = async () => {
        const moreToLoad = await load();

        if (!moreToLoad) setIsFinished(true);
    };

    useEffect(() => {
        setIsFinished(false);
    }, [transactions]);

    const save = useCallback(async (data: any) => {
        const newDoc: Transaction = {
            ...data,
            amount: +data.amount,
            date: new Date(data.date).getTime() / 1000,
            id: guidGenerator()
        };

        const response = await addTransaction(newDoc);

        if (response) {
            setState('idle');
        }
    }, [addTransaction]);


    return (
        <section className='overflow-hidden'>
            <div className={'w-[200vw] overflow-hidden flex transition-transform duration-500 transform-gpu ' + (state === 'creating' ? '-translate-x-1/2' : '')}>
                <div className='container w-screen'>
                    {view === 'table' && <TransactionsTable handleAdd={() => setState('creating')} />}
                    {view === 'pretty' && <TransactionsList />}

                    {!isFinished && (
                        <div className='flex justify-center'>
                            <button className='rounded-full bg-white shadow-lg mt-4 p-4 px-10 hover-grow-sm' onClick={() => doLoad()}>Load more</button>
                        </div>
                    )}
                </div>
                <div className='container w-screen'>
                    <div className='bg-white shadow-lg p-10 rounded-3xl'>
                        <div className='flex justify-between items-center mb-10'>
                            <h1 className=' uppercase font-light text-4xl tracking-wider'>Add</h1>
                            <button className='flex items-center py-2 px-4 hover-grow-sm' onClick={() => setState('idle')}>
                                <i className='mr-2 fa fa-arrow-left'></i>
                                <span>Go back</span>
                            </button>
                        </div>
                        <TransactionEditor
                            title={false}
                            onCancel={() => setState('idle')}
                            onSave={(data) => save(data)}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Transactions;