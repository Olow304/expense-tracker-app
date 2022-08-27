import { useRouter } from 'next/router';
import path from 'path';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../../components/Navbar';
import RightSideBar from '../../components/RightSideBar';
import Sidebar from '../../components/Sidebar';
import { updateProfileInput } from '../../server/inputs/updateProfile';
import { trpc } from '../../utils/trpc';


function Edit() {
    const router = useRouter();
    const { handleSubmit, register, reset } = useForm<updateProfileInput>();
    const [emptyFields, setEmptyFields] = useState<any>();
    const [userEmail, setUserEmail] = useState<any>();

    useEffect(() => {
        if (!localStorage.getItem("token")) router.push("/login");

        // git userEmail from localStorage
        const userEmail = localStorage.getItem("expense-userEmail");
        if (userEmail) {
            setUserEmail(userEmail?.replace(/^"|"$/g, ''));
        }
    }, [])


    const gender = [
        {
            name: "male",
            id: 1
        },
        {
            name: "female",
            id: 2
        }
    ]

    const { mutate, error } = trpc.useMutation(["user.update-profile"], {
        onSuccess: (data) => {
            router.push("/profile/edit");
            router.reload()
        }
    });

    function onSubmit(data: updateProfileInput) {
        // check if all fields are filled
        if (data.name !== "" && data.gender !== "") {
            mutate({
                ...data,
                email: userEmail
            });
        } else {
            setEmptyFields(true);
        }
    }

    return (
        <div className="flex flex-col bg-gray-100 h-screen">
            <div>
                <Navbar />
            </div>
            <div className="flex">
                <div className="flex w-[18%]">
                    <Sidebar active=''/>
                </div>
                <div className="flex flex-col flex-1">
                    <div className='flex flex-col gap-10 p-4 h-[95vh]'>
                        <h1>Edit profile</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                            {error && <div className="text-red-500">{error.message}</div>}
                            { emptyFields && <div className="text-red-500">Please fill all fields</div>}
                            <input
                                type="text" placeholder="Change your username"
                                className="border-2 border-gray-400 p-2 rounded-lg"
                                {...register('name')} />
                            
                            <select
                                className="border-2 border-gray-400 p-2 rounded-lg"
                                {...register('gender')}>
                                <option value="">Select your gender</option>
                                {gender && gender.map((gen: any) => {
                                    return <option key={gen.id} value={gen.name}>{gen.name}</option>
                                }
                                )}
                            </select>

                            <button type="submit" className="border-2 border-blue-600 p-2 rounded-lg bg-blue-600 text-white text-xl uppercase">Update profile</button>
                        </form>

                        <span className='italic text-sm font-semibold text-gray-600'>Handling profile image will be added in the future.</span>
                    </div>
                </div>

                <div className="w-[25%]">
                    <RightSideBar />
                </div>

            </div>
        </div>
    );
}

export default Edit;