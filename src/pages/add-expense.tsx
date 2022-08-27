import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import RightSideBar from '../components/RightSideBar';
import Sidebar from '../components/Sidebar';
import { addExpenseInput } from '../server/inputs/addExpenseSchema';
import { trpc } from '../utils/trpc';


function AddExpense() {
    const router = useRouter();
    const { handleSubmit, register } = useForm<addExpenseInput>();
    const [emptyFields, setEmptyFields] = useState<any>();
    const [userEmail, setUserEmail] = useState<any>();
    const [categories, setCategories] = useState<any>();
    const { pathname } = router;

    useEffect(() => {
        if (!localStorage.getItem("token")) router.push("/login");

        // git userEmail from localStorage
        const userEmail = localStorage.getItem("expense-userEmail");
        if (userEmail) {
            setUserEmail(userEmail?.replace(/^"|"$/g, ''));
        }
    }, [])

    const TransactionTypes = [
        {
            value: "spend",
            id: "1"
        },
        {
            value: "saved",
            id: "2"
        },
    ]

    // get all categories from server
    trpc.useQuery(['user.get-categories'], {
        onSuccess: (data: any) => {
            setCategories(data);
        }
    });

    const { mutate, error } = trpc.useMutation(["user.add-expense"], {
        onSuccess: (data) => {
            console.log("success", data);
            router.push("/");
        }

    });


    function onSubmit(data: addExpenseInput) {
        // check if all fields are filled
        if (data.category === "saved" && data.userEmail !== "") {
            mutate({
                ...data,
                amount: Number(data.amount),
                userEmail: userEmail
            });
        }  else {
            if (
                data.amount === undefined || 
                data.transactionType === "" || 
                data.userEmail === "" || 
                data.color === "" ||
                data.transactionType === "") {
                setEmptyFields(true);
            } else {
                mutate({
                    ...data,
                    amount: Number(data.amount),
                    userEmail: userEmail
                });
            }
        }
        
        
        
    }

    return (
        <div className="flex flex-col bg-gray-100 h-screen">
            <div>
                <Navbar />
            </div>
            <div className="flex">
                <div className="flex w-[18%]">
                    <Sidebar active={pathname} />
                </div>
                <div className="flex flex-col flex-1">
                    <div className='flex flex-col gap-10 p-4 h-[95vh]'>
                        <h1 className='text-xl text-gray-600'>Add Expense</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                            {error && <div className="text-red-500">{error.message}</div>}
                            {emptyFields && <div className="text-red-500">All fields are required</div>}
                            <input
                                type="text" placeholder="Add amount"
                                className="border-2 border-gray-400 p-2 rounded-lg"
                                {...register('amount')} />

                            <input
                                type="text" placeholder="Add description"
                                className="border-2 border-gray-400 p-2 rounded-lg"
                                {...register('description')} />
                            <select
                                className="border-2 border-gray-400 p-2 rounded-lg"
                                {...register('category')}>
                                <option value="">Select categories</option>
                                {categories && categories.map((category: any) => {
                                    return <option key={category.id} value={category.name}>{category.name}</option>
                                }
                                )}
                            </select>

                            <input
                                type="text" placeholder="Add user email"
                                value={userEmail ? userEmail : ""}
                                readOnly
                                disabled
                                className="border-2 border-gray-400 p-2 rounded-lg text-gray-500"
                                {...register('userEmail')} />

                            <input
                                type="text" placeholder="Add color"
                                className="border-2 border-gray-400 p-2 rounded-lg"
                                {...register('color')} />

                            <select

                                className="border-2 border-gray-400 p-2 rounded-lg"
                                {...register('transactionType')}>
                                <option value="">Select Transaction type</option>
                                {TransactionTypes && TransactionTypes.map((ttype: any) => {
                                    return <option key={ttype.id} value={ttype.value}>{ttype.value}</option>
                                }
                                )}
                            </select>

                            <button type="submit" className="border-2 border-blue-600 p-2 rounded-lg bg-blue-600 text-white text-xl uppercase">Create expense</button>
                        </form>
                    </div>
                </div>

                <div className="w-[25%]">
                    <RightSideBar />
                </div>

            </div>
        </div>
    );
}

export default AddExpense;