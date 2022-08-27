import React from 'react';
import { getAllExpensesInput } from '../server/inputs/getAllExpenses';
import Transactions from './transactions/Transactions';
import TransactionsAction from './transactions/TransactionsAction';

function MainContent({getAllExpenses} : {getAllExpenses: any}) {
    return (
        <div className='flex flex-col gap-10 p-4 h-[95vh] mobile:h-full'>
            <TransactionsAction getAllExpenses={getAllExpenses}/>
            <Transactions getAllExpenses={getAllExpenses}/>
        </div>
    );
}

export default MainContent;