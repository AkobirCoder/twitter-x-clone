import React, { ReactElement } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface ModalProps {
    title?: string,
    body?: ReactElement,
    footer?: ReactElement,
    step?: number,
    totalSteps?: number,
    isOpen?: boolean,
    onClose?: () => void,
}

export default function Modal({
    title,
    body,
    footer,
    step,
    totalSteps,
    isOpen,
    onClose
}: ModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='bg-black'>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className='mt-4'>{body}</div>
                {
                    footer && <div className='mt-4'>{footer}</div>
                }
            </DialogContent>
        </Dialog>
    );
}
