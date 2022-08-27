import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { trpc } from '../utils/trpc';
import RSBProfile from './profile/RSBProfile';

function RightSideBar() {
    const [userProfile, setUserProfile] = useState<any>();
    const [userEmail, setUserEmail] = useState<any>();

    useEffect(() => {
        const username = localStorage.getItem("expense-userEmail");
        if (username) {
            setUserEmail(username);
        }
    }, [])

    // get user profile, user.get-profile useQuery
    const { data, error, } = trpc.useQuery(['user.get-profile', { email: userEmail?.replace(/^"|"$/g, '') }], {
        onSuccess: (data) => {
            setUserProfile({ ...data });
            console.log("profile_right_side", data)
        }
    })

    // create function that return image if image is provided else return gender image 
    const getImage = () => {
        if (userProfile?.gender === 'female') return '/female.png';
        else return '/male.png';
    }

    return (
        <div className='p-4 pr-10 mobile:pr-4'>
            <div className='bg-slate-200 h-[250px] rounded-md flex flex-col pt-4 items-center'>
                <div className=''>
                    <Image
                        src={getImage()}
                        alt='profile' width={70} height={70} />
                </div>
                <span className='text-md text-red-500'>{userProfile?.name}</span>
                <RSBProfile />
            </div>
        </div>
    );
}

export default RightSideBar;