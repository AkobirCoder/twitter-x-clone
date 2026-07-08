import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { IUser } from '@/types';
import { sliceText } from '@/lib/utils';

// interface UserProps {
//     user: IUser,
// }

const User = ({user}: {user: IUser}) => {
    return (
        <div className='flex items-center justify-between gap-3 cursor-pointer p-2 rounded-md hover:bg-neutral-300/30 transition'>
            <div className='flex items-center gap-2 cursor-pointer'>
                <Avatar>
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>

                <div className='flex flex-col'>
                    <p className='text-white text-xs line-clamp-1'>
                        {user.name}
                    </p>
                    <p className='text-neutral-400 text-xs line-clamp-1'>
                        {
                            user.username ? (
                                `${sliceText(user.username, 25)}`
                            ) : (
                                sliceText(user.email, 25)
                            )
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}

export default User;