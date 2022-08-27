import Link from 'next/link';
import React, { useState } from 'react';
import { BsHouseDoorFill, BsFillHeartFill, BsBasket2Fill, BsGearFill, BsFillPlusCircleFill } from 'react-icons/bs';

function Sidebar({ active }: { active: string }) {
    const [sideBar, setSideBar] = useState(false);


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
        <nav className="w-full bg-gray-700 shadow ">
            <div className='justify-between px-4 mx-auto desktop:max-w-7xl mobile:items-start mobile:flex mobile:px-8 mobile:flex-col'>
                <div>
                    <div className="flex items-center justify-end py-3 md:py-5 mobile:mr-auto">

                        <div className="md:hidden laptop:hidden desktop:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setSideBar(!sideBar)}
                            >
                                {sideBar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {sidebarItems.map((item, index) => (
                        <div key={index} className={`flex-1 justify-self-center pb-3 mt-8  md:block md:pb-0 md:mt-0 ${sideBar ? "block" : "hidden"
                            } laptop:block desktop:block` }>
                            <Link href={item.path} className="flex-1 ">
                                <a className='flex gap-3 text-gray-400'>
                                    {item.icon} {active === item.path || active === item.name ? <span className='text-white'>{item.name}</span> : item.name}
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </nav>

    );
}

export default Sidebar;