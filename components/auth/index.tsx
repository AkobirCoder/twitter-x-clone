"use client"

import Image from 'next/image';
import React, { useCallback } from 'react';
import Button from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { FaApple } from 'react-icons/fa';
import useRegisterModal from '@/hooks/use-register-modal';
import RegisterModal from '../modals/register-modal';
import useLoginModal from '@/hooks/use-login-modal';
import LoginModal from '../modals/login-modal';
import { signIn, useSession } from 'next-auth/react';

export default function Auth() {
    const registerModal = useRegisterModal();

    const loginModal = useLoginModal();

    const { data } = useSession();

    console.log(data);

    const onOpenRegisterModal = useCallback(() => {
        registerModal.onOpen();
    }, [registerModal]);

    const onOpenLoginModal = useCallback(() => {
        loginModal.onOpen();
    }, [loginModal]);

    return (
        <>
            <RegisterModal />
            <LoginModal />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen p-5 md:p-0'>
                <Image 
                    src={'/images/x.svg'} 
                    alt='X' 
                    width={450} height={450} 
                    className='justify-self-center hidden md:block'
                />

                <div className='flex flex-col justify-evenly md:justify-between h-full md:h-[70vh]'>
                    <div className='block md:hidden'>
                        <Image 
                            src={'/images/x.svg'} 
                            alt='X' 
                            width={50} height={50} 
                            className='justify-self-start md:block'
                        />
                    </div>
                    <h1 className='text-6xl font-bold'>Happening now</h1>
                    <div className='w-full md:w-[60%]'>
                        <h2 className='font-bold text-3xl mb-4'>Join today.</h2>
                        <div className='flex flex-col space-y-2'>
                            <Button
                                label={
                                    <div 
                                        className='flex gap-2 items-center justify-center'
                                    >
                                        <FcGoogle />
                                        Signup with Google
                                    </div>
                                } 
                                fullWidth
                                secondary
                                onClick={() => signIn('google')}
                            />
                            <Button 
                                label={
                                    <div 
                                        className='flex gap-2 items-center justify-center'
                                    >
                                        <FaApple />
                                        Signup with Apple
                                    </div>
                                } 
                                fullWidth
                                secondary
                                onClick={() => signIn("github")}
                            />
                            <Button 
                                label={
                                    <div 
                                        className='flex gap-2 items-center justify-center'
                                    >
                                        <AiFillGithub />
                                        Signup with GitHub
                                    </div>
                                } 
                                fullWidth
                                secondary
                                onClick={() => signIn("github")}
                            />
                            <div className='flex items-center justify-center'>
                                <div className='h-px bg-gray-700 w-1/2' />
                                <p className='mx-4'>or</p>
                                <div className='h-px bg-gray-700 w-1/2' />
                            </div>
                            <Button
                                label={'Create account'}
                                fullWidth
                                onClick={onOpenRegisterModal}
                            />
                            <div className='text-[10px] text-gray-400'>
                                By signing up, you agree to the <span className='text-sky-500 cursor-pointer'>Terms of Service</span> and
                                <span className='text-sky-500 cursor-pointer'> Privacy Policy</span>, including
                                <span className='text-sky-500 cursor-pointer'> Cookie Use</span>.
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-[60%]'>
                        <h3 className='font-medium text-xl mb-4'>
                            Already have an account?
                        </h3>
                        <Button
                            label={'Sign in'}
                            fullWidth
                            outline
                            onClick={onOpenLoginModal}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
