import React from 'react';
import { getAllExpensesInput } from '../../server/inputs/getAllExpenses';
import TransactionCard from './TransactionCard';
import moment from "moment";


function Transactions({getAllExpenses} : {getAllExpenses: any}) {
    const removeExpense = (id: any) => {
        console.log("remove expense", id);
    }
    return (
        <div className='flex flex-col gap-2'>
            <span className='text-lg text-gray-600'>Transactions</span>
            <div className='flex flex-col gap-2'>
                { getAllExpenses?.map((expense: any, index: any) => (
                    <div key={index}>
                        <TransactionCard 
                            color={expense.color} 
                            category={expense?.category} 
                            title={expense?.transactionType === 'saved' ? 'Congratulation for saving! 🥳' : expense?.description} 
                            date={moment(expense?.createdAt).format('MMM Do YYYY')}
                            amount={expense?.amount}
                            transactionType={expense.transactionType}
                            expenseId={expense.id}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Transactions;