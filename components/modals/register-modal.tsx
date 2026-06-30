"use client"

import { useRegisterModal } from '@/hooks/use-register-modal';
import React from 'react';
import Modal from '../ui/modal';

export default function RegisterModal() {
    const registerModal = useRegisterModal();

    const { isOpen, onClose } = registerModal;

    const body = (
        <div>Body content</div>
    );

    const footer = (
        <div>Footer content</div>
    );

    return (
        <Modal 
            title='Create an account' 
            body={body} 
            footer={footer} 
            isOpen={isOpen} 
            onClose={onClose}
        />
    );
}
