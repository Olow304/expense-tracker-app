import Link from 'next/link';
import React from 'react';
import {BsHouseDoorFill, BsFillHeartFill, BsBasket2Fill, BsGearFill, BsFillPlusCircleFill} from 'react-icons/bs';

function Sidebar({active} : {active: string}) {

    const sidebarItems = [
        {
            name: "Home",
            path: "/",
            icon: <BsHouseDoorFill size={20} color="gray" />
        },
        {
            name: "Categories",
            path: "/categories",
            icon: <BsFillHeartFill size={20} color="gray" />
        },
        {
            name: "Transactions",
            path: "/transactions",
            icon: <BsBasket2Fill size={20} color="gray" />
        },
        {
            name: "Add Expense",
            path: "/add-expense",
            icon: <BsFillPlusCircleFill size={22} color="gray" />
        },
        {
            name: "Settings",
            path: "/settings",
            icon: <BsGearFill size={20} color="gray" />
        }
    ];

    return (
        <div className='flex flex-col text-gray-500 pl-10 pt-2 text-md gap-2'>
            {sidebarItems.map((item, index) => (
                <div key={index} className="flex items-center p-2">
                    <Link href={item.path} className="flex-1">
                        <a className='flex gap-3'>
                            {item.icon} {active === item.path || active === item.name ? <span className='text-black'>{item.name}</span> : item.name}
                        </a>
                    </Link>
                </div>
            ))}

        </div>
    );
}

export default Sidebar;