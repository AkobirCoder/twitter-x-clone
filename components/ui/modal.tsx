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
            <DialogContent className='bg-black p-2'>
                <div className='flex items-center gap-5'>
                    <button className='p-1 text-white hover:bg-neutral-800 hover:opacity-70 rounded-md transition cursor-pointer' onClick={onClose}>
                        <X size={20} />
                    </button>
                    {
                        step && totalSteps && (
                            <div className='text-lg'>Step {step} of {totalSteps}</div>
                        )
                    }
                </div>
                <div className='mt-4'>{body}</div>
                {
                    footer && <div>{footer}</div>
                }
            </DialogContent>
        </Dialog>
    );
}
