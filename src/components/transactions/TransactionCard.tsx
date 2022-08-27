import React from 'react';
import { BsChevronDown, BsCupStraw } from 'react-icons/bs';
import { HiCurrencyDollar, HiShoppingCart } from 'react-icons/hi';
import { FaMinusCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';

function TransactionCard({ color, title, category, date, amount, transactionType, expenseId }:
    { color: string, title: string, category: string, date: string, amount: string, transactionType: string, expenseId: string }) {
    const router = useRouter();

    // delete expense from server
    const { mutate: mutateDelete, error: errorDelete } = trpc.useMutation(["user.delete-expense"], {});
    const removeExpense = () => {
        if (expenseId) {
            mutateDelete({ expenseId });
            router.reload();
        }
    }

    return (
        <div className='w-full h-[60px] rounded-lg border-b-2 shadow-md flex px-6 py-2 items-center mb-4'>
            { errorDelete && <div className='text-red-500'>{errorDelete.message}</div> }
            <div className='flex gap-4 items-center justify-center'>
                <div className='bg-[#e3e6e9] rounded-lg h-[30px] w-[30px] flex justify-center items-center'>
                    {transactionType === 'saved' ? <HiCurrencyDollar size={20} color="green" /> : <BsCupStraw size={20} color="gray" />}
                </div>
                <div className='flex flex-col '>
                    <span className='text-sm text-gray-800 flex gap-2'>
                        <span className='text-gray-800'>{title}</span>
                        <span className='bg-green-200 px-2 py-0 rounded-md text-xs flex items-center text-gray-500 mobile:hidden' color={color}>{category}</span>
                    </span>
                    <span className='text-sm text-gray-500'>{date}</span>
                </div>
            </div>
            <div className='ml-auto flex gap-2 items-center'>
                {transactionType === 'saved' || transactionType === 'save' ? <span className='text-green-500 text-sm'>+${amount}</span> : <span className='text-red-500 text-sm'>-${amount}</span>}
                <button onClick={removeExpense}>
                    <FaMinusCircle size={16} color="#86888b" fontWeight={700} />
                </button>
            </div>
        </div>
    );
}

export default TransactionCard;