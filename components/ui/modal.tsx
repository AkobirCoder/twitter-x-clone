import React, { ReactElement } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { X } from 'lucide-react';

interface ModalProps {
    step?: number,
    totalSteps?: number,
    body?: ReactElement,
    footer?: ReactElement,
    isOpen?: boolean,
    onClose?: () => void,
}

export default function Modal({
    step,
    totalSteps,
    body,
    footer,
    isOpen,
    onClose
}: ModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='bg-black p-1'>
                <div className='flex items-center gap-4'>
                    <button className='p-1 border-0 text-white hover:opacity-70 transition w-fit cursor-pointer'>
                        <X size={28} onClick={onClose} />
                    </button>
                    {
                        step && totalSteps && (
                            <div className='text-xl font-bold'>Step {step} of {totalSteps}</div>
                        )
                    }
                </div>
                <div className='mt-4'>{body}</div>
                {
                    footer && <div className='mt-4'>{footer}</div>
                }
            </DialogContent>
        </Dialog>
    );
}
