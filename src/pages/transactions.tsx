import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RightSideBar from '../components/RightSideBar';
import Sidebar from '../components/Sidebar';
import Transactions from '../components/transactions/Transactions';
import { trpc } from '../utils/trpc';


function TransactionsPage() {
    const router = useRouter();
    const [getAllExpenses, setGetAllExpenses] = useState<any>();
    const [userEmail, setUserEmail] = useState<any>();
    const { pathname } = router;
    useEffect(() => {
        if (!localStorage.getItem("token")) router.push("/login");
        const userEmail = localStorage.getItem("expense-userEmail");
        if (userEmail) {
            setUserEmail(userEmail);
        }
    }, [])

    const { data, error, isLoading } = trpc.useQuery(['user.get-expense', { userEmail: userEmail?.replace(/^"|"$/g, '') }], {
        onSuccess: (data) => {
            setGetAllExpenses(data);
        }
    });

    return (
        <div className="flex flex-col">
            <div>
                <Navbar />
            </div>
            <div className="flex mobile:flex mobile:flex-col">
                <div className="flex w-[18%] mobile:w-full">
                    <Sidebar active={pathname} />
                </div>
                <div className="flex flex-col flex-1">
                    <div className='flex flex-col gap-10 p-4 h-[95vh] mobile:h-full'>
                        { error && <div className="text-red-500">{error.message}</div> }
                        <Transactions getAllExpenses={getAllExpenses}/>
                    </div>
                </div>

                <div className="w-[25%] mobile:w-full">
                    <RightSideBar />
                </div>

            </div>
        </div>
    );
}

export default TransactionsPage;