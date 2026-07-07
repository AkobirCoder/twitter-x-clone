"use client"

import useRegisterModal from '@/hooks/use-register-modal';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Modal from '../ui/modal';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerStep1Schema, registerStep2Schema } from '@/lib/validation';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import Button from '../ui/button';
import { AlertCircleIcon, ArrowRight } from 'lucide-react';
import useLoginModal from '@/hooks/use-login-modal';
import axios from 'axios';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { signIn } from 'next-auth/react';

export default function RegisterModal() {
    const [step, setStep] = useState(1);

    const [data, setData] = useState({
        name: '',
        email: '',
    });

    const registerModal = useRegisterModal();

    const loginModal = useLoginModal();

    const onToggle = useCallback(() => {
        registerModal.onClose();

        loginModal.onOpen();
    }, [registerModal, loginModal]);

    const { isOpen, onClose } = registerModal;

    const bodyContent = step === 1 ? (
        <RegisterStep1 setData={setData} setStep={setStep} />
    ) : (
        <RegisterStep2 data={data} />
    );

    const footer = (
        <div className='text-neutral-400 text-center mb-4'>
            <p>Already have an account?{" "}
                <span 
                    className='text-white cursor-pointer hover:underline'
                    onClick={onToggle}
                >
                    Sign in
                </span>
            </p>
        </div>
    );

    return (
        <Modal 
            step={step}
            totalSteps={2}
            body={bodyContent} 
            footer={footer} 
            isOpen={isOpen} 
            onClose={onClose}
        />
    );
}

function RegisterStep1({setData, setStep}: {
    setData: Dispatch<SetStateAction<{ // useState borligi uchun tipizatsiya qilindi
        name: string,
        email: string,
    }>>,
    setStep: Dispatch<SetStateAction<number>>,
}) {
    const [error, setError] = useState('');

    const form = useForm<z.infer<typeof registerStep1Schema>>({
        resolver: zodResolver(registerStep1Schema),
        defaultValues: {
            name: '',
            email: '',
        }
    });

    async function onSubmit(values: z.infer<typeof registerStep1Schema>) {
        try {
            const { data: response } = await axios.post('/api/auth/register?step=1', values);

            if (response.success) {
                setData(values);

                setStep(2);
            }
        } catch (error: any) {
            if (error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Something went wrong. Please try again later.');
            }
            console.log(error);
        }
    }

    const { isSubmitting } = form.formState;

    return (
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
                Create an account
            </h3>
            <Controller
                name='name'
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel className='font-light'>
                            Name
                        </FieldLabel>
                        <Input
                            {...field}
                            placeholder='Name'
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
            <Button
                label={
                    <div className='flex gap-2 items-center justify-center'>
                        Continue
                        <div className='flex items-center justify-center'>
                            <ArrowRight size={16} />
                        </div>
                    </div>
                }
                type='submit'
                secondary
                fullWidth
                large
                disabled={isSubmitting}
                className={'h-10 flex items-center justify-center text-md rounded-md'}
            />
        </form>
    );
}

function RegisterStep2({data}: {
    data: {
        name: string,
        email: string,
    }
}) {
    const [error, setError] = useState('');

    const registerModal = useRegisterModal();
    
    const form = useForm<z.infer<typeof registerStep2Schema>>({
        resolver: zodResolver(registerStep2Schema),
        defaultValues: {
            username: '',
            password: '',
        }
    });

    async function onSubmit(values: z.infer<typeof registerStep2Schema>) {
        try {
            const { data: response } = await axios.post('/api/auth/register?step=2', {
                ...data,
                ...values,
            });

            if(response.success) {
                signIn('credentials', {
                    email: data.email,
                    password: values.password,
                });

                registerModal.onClose();
            }
        } catch (error: any) {
            if (error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Something went wrong. Please try again later.');
            }
            console.log(error);
        }
    }

    const { isSubmitting } = form.formState;

    return (
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
            <Controller
                name='username'
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel className='font-light'>
                            Username
                        </FieldLabel>
                        <Input
                            {...field}
                            placeholder='Username'
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
                            placeholder='Password'
                            type='password'
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
                label={'Register'}
                type='submit'
                secondary
                fullWidth
                large
                disabled={isSubmitting}
                className={'h-10 flex items-center justify-center text-md rounded-md'}
            />
        </form>
    );
}