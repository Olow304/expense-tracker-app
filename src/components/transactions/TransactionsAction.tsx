import Link from 'next/link';
import React from 'react';
import { BsFillHeartFill, BsFillJournalBookmarkFill, BsFillPlusCircleFill } from 'react-icons/bs';

function TransactionsAction({getAllExpenses} : {getAllExpenses: any}) {

    // create a function that returns sum of all expenses getAllExpenses
    // check if transactionType is 'spend'

    const getSum = (transactionType: any) => {
        let sum = 0;
        getAllExpenses?.forEach((transaction: any) => {
            if (transaction.transactionType === transactionType) {
                sum += transaction.amount;
            }
        });
        return sum;
    }

    return (
        <div className='flex flex-col gap-2'>
            <span className='text-gray-600 text-lg' >Overview</span>
            <div className='flex gap-8 mobile:flex mobile:flex-col'>
                <div className='flex gap-4 justify-center items-center bg-[#f77898] w-fit px-8 py-2 rounded-lg mobile:w-full'>
                    <BsFillJournalBookmarkFill size={22} color="white" />
                    <div className='flex flex-col text-sm mobile:flex mobile:flex-row mobile:gap-5'>
                        <span className='text-white'>Total Spend</span>
                        <span className='text-white'>-${getSum('spend')}</span>
                    </div>
                </div>

                <div className='flex gap-4 justify-center items-center bg-[#51cfce] w-fit px-8 py-2 rounded-lg mobile:w-full'>
                    <BsFillHeartFill size={22} color="white" />
                    <div className='flex flex-col text-sm mobile:flex mobile:flex-row mobile:gap-5'>
                        <span className='text-white'>Total Saving</span>
                        <span className='text-white'>+${getSum('saved')}</span>
                    </div>
                </div>

                <Link href='/add-expense'>
                    <div className='flex gap-4 justify-center items-center bg-[#70c0ff] w-fit px-8 py-2 rounded-lg cursor-pointer mobile:w-full'>
                        <BsFillPlusCircleFill size={22} color="white" />
                        <div className='flex flex-col text-sm'>
                            <span className='text-white'>Add new Expense</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default TransactionsAction;