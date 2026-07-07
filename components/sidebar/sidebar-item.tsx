"use client"

import { LucideIcon } from 'lucide-react';
import React from 'react';

interface SidebarItemProps {
    label: string,
    // path: string,
    icon: LucideIcon,
}

const SidebarItem = ({label, icon: Icon}: SidebarItemProps) => {
    return (
        <div className='flex flex-row items-center'>
            {/* --- Mobile Sidebar Item --- */}
            <div
                className={`relative rounded-full h-14 w-14 flex items-center justify-center p-4
                hover:bg-slate-600 hover:bg-opacity-10 lg:hidden`}
            >
                <Icon size={28} color='white' />
            </div>

            {/* --- Desktop Sidebar Item --- */}
            <div
                className={`relative hidden lg:flex items-center gap-4 px-4 py-2 rounded-full
                hover:bg-slate-600 hover:bg-opacity-10 cursor-pointer`}
            >
                <Icon size={24} color='white' />
                <p className='hidden lg:block text-xl text-white'>
                    {label}
                </p>
            </div>
        </div>
    );
}

export default SidebarItem;