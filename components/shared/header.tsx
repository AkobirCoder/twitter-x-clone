"use client"

import { useRouter } from 'next/navigation';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';

interface HeaderProps {
    label: string,
    isBack?: boolean,
}

const Header = ({label, isBack}: HeaderProps) => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    }

    return (
        <div className='border-b border-neutral-800 w-full p-5'>
            <div className='flex flex-row items-center gap-2'>
                {
                    isBack && (
                        <BiArrowBack 
                            size={20}
                            color='white'
                            className='cursor-pointer hover:opacity-70 transition'
                            onClick={handleBack}
                        />
                    )
                }
                <h1 className='text-white text-xl font-semibold'>
                    {label}
                </h1>
            </div>
        </div>
    );
}

export default Header;