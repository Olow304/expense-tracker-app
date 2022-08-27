import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import RightSideBar from '../components/RightSideBar';
import Sidebar from '../components/Sidebar';
import { addCategoryInput } from '../server/inputs/addCategory';
import { trpc } from '../utils/trpc';


function Categories() {
    const router = useRouter();
    const { handleSubmit, register } = useForm<addCategoryInput>();
    const [emptyCategory, setEmptyCategory] = useState<any>();
    const [categories, setCategories] = useState<any>();
    // get current route from router
    const { pathname } = router;
    useEffect(() => {
        if (!localStorage.getItem("token")) router.push("/login");
    }, [])

    // get all categories from server
    const { data } = trpc.useQuery(['user.get-categories'], {
        onSuccess: (data) => {
            setCategories(data);
        }
    });

    // add category to server
    const { mutate, error } = trpc.useMutation(["user.add-category"], {
        onSuccess: (data) => {
            router.reload();
        }
    });

    // delete category from server
    const { mutate: mutateDelete, error: errorDelete } = trpc.useMutation(["user.delete-category"], {
        onSuccess: (data) => {
            router.reload();
        }
    });

    function onSubmit(data: addCategoryInput) {
        // check if category is empty
        if (data.name === "") {
            setEmptyCategory(true);
        }
        mutate(data);
    }

    const deleteCategory = (name: string) => {
        mutateDelete({name});
    }

    return (
        <div className="flex flex-col ">
            <div>
                <Navbar />
            </div>
            <div className="flex mobile:flex mobile:flex-col">
                <div className="flex w-[18%] mobile:w-full">
                    <Sidebar active={pathname} />
                </div>
                <div className="flex flex-col flex-1">
                    <div className='flex flex-col gap-4 p-4 h-[95vh] mobile:h-full'>
                        <h1 className='text-xl text-gray-600'>Categories</h1>
                        <span>Here are all categories we have</span>
                        <div className='flex flex-col'>
                            {categories && categories.map((category: any) => (
                                <div key={category.id} className='flex gap-2 items-center border-2 border-gray-400 p-1 mb-1 rounded-lg'>
                                    <span className='px-2'>{category.name}</span>
                                    <button
                                        className='ml-auto px-2 hover:bg-red-200'
                                        onClick={() => deleteCategory(category.name)}>x</button>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                            {error && <div className="text-red-500">{error.message}</div>}
                            {emptyCategory && <div className="text-red-500">Category name is empty</div>}
                            <input
                                type="text" placeholder="Add category"
                                className="border-2 border-gray-400 p-2 rounded-lg"
                                {...register('name')} />

                            <button type="submit" className="border-2 border-blue-600 p-2 rounded-lg bg-blue-600 text-white text-xl uppercase">add</button>
                        </form>
                    </div>
                </div>

                <div className="w-[25%] mobile:w-full">
                    <RightSideBar />
                </div>

            </div>
        </div>
    );
}

export default Categories;