"use client"

import { useRegisterModal } from '@/hooks/use-register-modal';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Modal from '../ui/modal';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerStep1Schema, registerStep2Schema } from '@/lib/validation';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import Button from '../ui/button';
import { ArrowRight } from 'lucide-react';

export default function RegisterModal() {
    const [step, setStep] = useState(1);

    const [data, setData] = useState({
        name: '',
        email: '',
    });

    const registerModal = useRegisterModal();

    const { isOpen, onClose } = registerModal;

    const bodyContent = step === 1 ? (
        <RegisterStep1 setData={setData} setStep={setStep} />
    ) : (
        <RegisterStep2 />
    )

    const footer = (
        <div className='text-neutral-400 text-center mb-4'>
            <p>Already have an account?{" "}
                <span className='text-white cursor-pointer hover:underline'>
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
    const form = useForm<z.infer<typeof registerStep1Schema>>({
        resolver: zodResolver(registerStep1Schema),
        defaultValues: {
            name: '',
            email: '',
        }
    });

    function onSubmit(values: z.infer<typeof registerStep1Schema>) {
        setData(values);

        setStep(2);
    }

    const { isSubmitting } = form.formState;

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 px-12'>
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

function RegisterStep2() {
    const form = useForm<z.infer<typeof registerStep2Schema>>({
        resolver: zodResolver(registerStep2Schema),
        defaultValues: {
            username: '',
            password: '',
        }
    });

    function onSubmit(values: z.infer<typeof registerStep2Schema>) {
        console.log(values);
    }

    const { isSubmitting } = form.formState;

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 px-12'>
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