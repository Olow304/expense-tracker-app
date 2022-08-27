import { useRouter } from 'next/router';
import React from 'react';
import Navbar from '../../components/Navbar';
import RightSideBar from '../../components/RightSideBar';
import Sidebar from '../../components/Sidebar';

function ChangePassword() {
    const router = useRouter();
    return (
        <div className="flex flex-col">
            <div>
                <Navbar />
            </div>
            <div className="flex mobile:flex mobile:flex-col">
                <div className="flex w-[18%] mobile:w-full">
                    <Sidebar active=''/>
                </div>
                <div className="flex flex-col flex-1">
                    <div className='flex flex-col gap-10 p-4 h-[95vh] mobile:h-full'>
                        <h1>Change password</h1>
                        <span>TODO:</span>
                    </div>
                </div>

                <div className="w-[25%] mobile:w-full">
                    <RightSideBar />
                </div>

            </div>
        </div>
    );
}

export default ChangePassword;