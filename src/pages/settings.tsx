import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import RightSideBar from '../components/RightSideBar';
import Sidebar from '../components/Sidebar';


function Settings() {
    const router = useRouter();
    // get current route from router
    const { pathname } = router;
    useEffect(() => {
        if (!localStorage.getItem("token")) router.push("/login");
    }, [])

    return (
        <div className="flex flex-col">
            <div>
                <Navbar />
            </div>
            <div className="flex mobile:flex mobile:flex-col">
                <div className="flex w-[18%] mobile:w-full">
                    <Sidebar active={pathname}/>
                </div>
                <div className="flex flex-col flex-1">
                    <div className='flex flex-col gap-10 p-4 h-[95vh] mobile:h-full'>
                        <h1 className='text-xl text-gray-600'>Settings</h1>
                    </div>
                </div>

                <div className="w-[25%] mobile:w-full">
                    <RightSideBar />
                </div>

            </div>
        </div>
    );
}

export default Settings;