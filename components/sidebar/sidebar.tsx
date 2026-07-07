"use client"

import { Bell, Home, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SidebarItem from './sidebar-item';
import SidebarPostButton from './sidebar-post-button';
import SidebarAccount from './sidebar-account';
import { IUser } from '@/types';

const Sidebar = ({user}: {user: IUser}) => {
    const sidebarItems = [
        {
            label: 'Home',
            path: '/',
            icon: Home,
        },
        {
            label: 'Notifications',
            path: `/notifications/${user._id}`,
            icon: Bell,
        },
        {
            label: 'Profile',
            path: `/profile/${user._id}`,
            icon: User,
        },
    ];

    return (
        <section
            className='sticky left-0 top-0 h-screen lg:w-66.5 w-fit flex flex-col justify-between py-4 px-2 lg:px-0'
        >
            <div className='flex flex-col space-y-2'>
                <div 
                    className={`rounded-full h-14 w-14 p-4 flex items-center justify-center
                    hover:bg-sky-300 hover:bg-opacity-10 cursor-pointer transition`}
                >
                    <Image
                        height={56}
                        width={56}
                        src={'/images/logo.svg'}
                        alt='Logo'
                    />
                </div>

                {
                    sidebarItems.map((item) => {
                        return (
                            <Link key={item.path} href={item.path}>
                                <SidebarItem {...item} />
                            </Link>
                        );
                    })
                }

                <SidebarPostButton />
            </div>
            {
                user && (
                    <SidebarAccount user={user} />
                )
            }
        </section>
    );
}

export default Sidebar;