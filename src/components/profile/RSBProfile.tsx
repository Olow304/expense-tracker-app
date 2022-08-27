import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { HiLogout } from 'react-icons/hi';

function RSBProfile() {
    const router = useRouter();
    // create list of profile items
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expense-username');
        localStorage.removeItem('expense-userEmail');
        router.push('/login');
    }

    const profileItems = [
        {
            name: "Edit Profile",
            path: "/profile/edit",
            icon: <BsFillPencilFill size={20} color="gray" />
        },
        {
            name: "Change Password",
            path: "/profile/change-password",
            icon: <BsFillPencilFill size={20} color="gray" />
        },
    ];
    return (
        <div className='flex flex-col  items-center pt-2'>
            {profileItems.map((item, index) => (
                <div key={index} className="flex p-2">
                    <Link href={item.path} className="">
                        <a className='flex gap-3'>
                            {item.name} {item.icon} 
                        </a>
                    </Link>
                </div>
            ))}
            <div className="flex p-2">
                <button className="flex gap-3" onClick={logout}>
                    Logout {<HiLogout size={20} color="gray" />}
                </button>
            </div>
        </div>
    );
}

export default RSBProfile;