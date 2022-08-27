import { useRouter } from 'next/router';
import React from 'react';
import Navbar from '../../components/Navbar';
import RightSideBar from '../../components/RightSideBar';
import Sidebar from '../../components/Sidebar';

function ChangePassword() {
    const router = useRouter();
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
                        <h1>Change password</h1>
                    </div>
                </div>

                <div className="w-[25%]">
                    <RightSideBar />
                </div>

            </div>
        </div>
    );
}

export default ChangePassword;