"use client"

import { IUser } from '@/types';
import { signOut } from 'next-auth/react';
import React from 'react';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface SidebarAccountProps {
    user: IUser,
}

const SidebarAccount = ({user}: SidebarAccountProps) => {
    return (
        <>
            {/* --- Mobile Sidebar Account --- */}
            <div className='lg:hidden block'>
                <div
                    className={`mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center
                    bg-red-500 hover:bg-red-500/80 transition cursor-pointer`}
                    onClick={() => signOut()}
                >
                    <RiLogoutCircleLine size={24} color='white' />
                </div>
            </div>

            {/* --- Desktop Sidebar Account --- */}
            <Popover>
                <PopoverTrigger
                    className={`w-full rounded-full hidden lg:block cursor-pointer px-4 py-3
                    hover:bg-slate-600 hover:bg-opacity-10 transition`}
                >
                    <div className='flex items-center justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                            <Avatar>
                                <AvatarImage src={user.profileImage} />
                                <AvatarFallback>
                                    {user.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col items-start text-white'>
                                <p className='text-sm'>{user.name}</p>
                                {
                                    user.username ? (
                                        <p className='opacity-40 text-sm'>{user.username}</p>
                                    ) : (
                                        <p className='opacity-40 text-sm'>Manage account</p>
                                    )
                                }
                            </div>
                        </div>
                        <MoreHorizontal size={24} color='white' />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className='bg-black border-none rounded-2xl shadow shadow-white px-0 mb-3'
                >   
                    <div
                        className='font-bold text-white cursor-pointer hover:bg-slate-600 hover:bg-opacity-10 p-4 transition'
                        onClick={() => signOut()}
                    >
                        Log out {user.username ? `@${user.username}` : user.name}
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
}

export default SidebarAccount;