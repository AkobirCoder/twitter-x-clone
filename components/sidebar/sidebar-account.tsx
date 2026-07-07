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
                    bg-red-700 hover:bg-red-700/80 transition cursor-pointer`}
                    onClick={() => signOut()}
                >
                    <RiLogoutCircleLine size={20} color='white' />
                </div>
            </div>

            {/* --- Desktop Sidebar Account --- */}
            <Popover>
                <PopoverTrigger
                    className={`w-full rounded-md hidden lg:block cursor-pointer px-4 py-3
                    hover:bg-accent hover:bg-opacity-10 transition`}
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
                                <p className='text-xs'>{user.name}</p>
                                {
                                    user.username ? (
                                        <p className='opacity-40 text-xs'>{user.username}</p>
                                    ) : (
                                        <p className='opacity-40 text-xs'>Manage account</p>
                                    )
                                }
                            </div>
                        </div>
                        <MoreHorizontal size={20} color='white' />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className='bg-black border-none rounded-md p-2 mb-3'
                >   
                    <div
                        className='rounded-md text-white cursor-pointer hover:bg-accent/50 hover:bg-opacity-10 py-2 px-4 transition'
                        onClick={() => signOut()}
                    >
                        Log out <span className='text-sky-500'>{user.username ? `@${user.username}` : user.name}</span>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
}

export default SidebarAccount;