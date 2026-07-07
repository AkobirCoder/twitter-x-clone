import React from 'react';
import Button from '../ui/button';
import { Loader2 } from 'lucide-react';
import User from './user';

const FollowBar = () => {
    const isLoaded = false;

    return (
        <div className='py-4 hidden lg:block w-66.5'>
            <div className='bg-neutral-800 rounded-md px-4 py-2'>
                <div className='flex items-center justify-between pb-2 border-b-2'>
                    <h2 className='text-white/80'>Who to follow</h2>
                    <Button
                        label={'See all'}
                        secondary
                        className='rounded-md px-4 py-1 font-light'
                    />
                </div>

                {
                    isLoaded ? (
                        <div className='flex items-center justify-center h-24'>
                            <Loader2 className='animate-spin text-sky-500' />
                        </div>
                    ): (
                        <div className='flex flex-col gap-6 mt-2'>
                            <User />
                        </div>
                    )
                }
                
            </div>
        </div>
    );
}

export default FollowBar;