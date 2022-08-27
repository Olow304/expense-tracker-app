import React from 'react';
import {BsBellFill, BsSearch} from 'react-icons/bs';

function Navbar() {
    return (
        <div className='p-2 pl-12 flex h-[50px] items-center'>
            <h1 className='w-[16.4%] text-2xl font-semibold text-gray-600'>Expense</h1>
            <div className='flex-1 flex gap-4 items-center'>
                <div className='flex gap-2 items-center w-[60%]'>
                    <BsSearch size={18} color="gray" fontWeight={700}/>    
                    <input type='text' className='h-[35px] bg-gray-100 rounded-lg border-2 border-gray-300 w-full' />
                </div>
                <span>Calender</span>
                <div className='flex gap-2 items-center'>
                    <BsBellFill size={18} color="black" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;