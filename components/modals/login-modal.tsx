/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useCallback, useState } from 'react';
import Modal from '../ui/modal';
import useLoginModal from '@/hooks/use-login-modal';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { loginSchema } from '@/lib/validation';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import Button from '../ui/button';
import useRegisterModal from '@/hooks/use-register-modal';
import axios from 'axios';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function LoginModal() {
    const [error, setError] = useState('');

    const loginModal = useLoginModal();

    const registerModal = useRegisterModal();

    const onToggle = useCallback(() => {
        loginModal.onClose();

        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const { isOpen, onClose } = loginModal;

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            const { data } = await axios.post('/api/auth/login', values);

            if (data.success) {
                signIn('credentials', values);

                loginModal.onClose();
            }
        } catch (error: any) {
            if (error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    }

    const { isSubmitting } = form.formState;

    const bodyContent = (
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 px-12'>
            {
                error && (
                    <Alert variant="destructive" className="max-w-md">
                        <AlertCircleIcon />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )
            }
            <h3 className='text-2xl font-semibold text-white'>
                Signin your profile
            </h3>
            <Controller
                name='email'
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel className='font-light'>
                            Email
                        </FieldLabel>
                        <Input
                            {...field}
                            placeholder='Email'
                        />
                        {
                            fieldState.invalid && (
                                <FieldError className='text-[12px]' errors={[fieldState.error]} />
                            )
                        }
                    </Field>
                )}
            />
            <Controller
                name='password'
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel className='font-light'>
                            Password
                        </FieldLabel>
                        <Input
                            {...field}
                            type='password'
                            placeholder='Password'
                        />
                        {
                            fieldState.invalid && (
                                <FieldError className='text-[12px]' errors={[fieldState.error]} />
                            )
                        }
                    </Field>
                )}
            />
            <Button
                label={'Sign in'}
                type='submit'
                secondary
                fullWidth
                large
                disabled={isSubmitting}
                className={'h-10 flex items-center justify-center text-md rounded-md'}
            />
        </form>
    );

    const footer = (
        <div className='text-neutral-400 text-center mb-4'>
            <p>First time using Twitter?{" "}
                <span 
                    className='text-white cursor-pointer hover:underline'
                    onClick={onToggle}
                >
                    Create an account
                </span>
            </p>
        </div>
    );

    return (
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
            body={bodyContent}
            footer={footer}
        />
    );
}
