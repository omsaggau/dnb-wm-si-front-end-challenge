import { useState } from 'react';
import { Transaction } from '../../types';


type IProps = {
    title?: string | boolean;
    transaction?: Transaction;
    onSave: (data: any) => void;
    onCancel: () => void;
}
const Editor = ({ title = 'Edit', transaction, onSave, onCancel }: IProps) => {
    const initialDate = transaction ? transaction.date * 1000 : Date.now();
    const [edited, setEdited] = useState({
        name: transaction?.name || '',
        date: new Date(initialDate).toISOString().substring(0,10),
        amount: transaction?.amount || 0
    });

    const handleChange = (field: keyof Transaction, value: any) => {
        setEdited({
            ...edited,
            [field]: value
        });
    };

    return (
        <div>
            {title && <h2 className='text-2xl mb-2'>{title}</h2>}
            <div className='flex -mx-2 items-center flex-wrap md:flex-nowrap'>
                <label className='m-2'>
                    <span className=''>Name</span>
                    <input 
                        className='w-full  rounded-lg border border-slate-700 p-3' 
                        type='text'
                        name='name'
                        data-testid='edit-name'
                        value={edited.name}
                        onChange={(e) => handleChange('name', e.target?.value)}
                    ></input>
                </label>
                <label className='m-2'>
                    <span className=''>Amount</span>
                    <input 
                        className='w-full  rounded-lg border border-slate-700 p-3' 
                        type='number'
                        name='amount'
                        data-testid='edit-amount'
                        value={edited.amount}
                        onChange={(e) => handleChange('amount', e.target?.value)}
                    ></input>
                </label>
                <label className='m-2'>
                    <span className=''>Date</span>
                    <input 
                        className='w-full  rounded-lg border border-slate-700 p-3' 
                        type='date'
                        name='date'
                        data-testid='edit-date'
                        value={edited.date}
                        onChange={(e) => handleChange('date', e.target?.value)}
                    ></input>
                </label>
            </div>
            <div className='flex justify-center text-white space-x-5 mt-5'>
                <button className='flex items-center py-2 px-4 rounded-3xl bg-slate-600 hover-grow-sm' onClick={() => onCancel()}>
                    <i className='mr-2 fa fa-close'></i>
                    <span>Cancel</span>
                </button>
                <button className='flex items-center py-2 px-4 rounded-3xl bg-green-700 hover-grow-sm' onClick={() => onSave(edited)}>
                    <i className='mr-2 fa fa-save'></i>
                    <span>Save</span>
                </button>
            </div>
        </div>
    );
};


export default Editor;