"use client"

import { IPost, IUser } from '@/types';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Button from '../ui/button';
import { toast } from 'sonner';
import axios from 'axios';

interface Props {
    placeholder: string,
    isComment?: boolean,
    postId?: string,
    user: IUser,
    setPosts: Dispatch<SetStateAction<IPost[]>>,
}

const Form = ({placeholder, isComment, postId, user, setPosts}: Props) => {
    const [body, setBody] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setIsLoading(true);

            const { data } = await axios.post('/api/posts', {
                body,
                userId: user._id,
            });

            const newPost = {...data, user, likes: 0, hasLiked: false, comments: 0}

            setPosts((prevState) => {
                return [newPost, ...prevState];
            });

            setIsLoading(false);

            setBody('');

            toast.success('Post created successfully!');
        } catch (error) {
            setIsLoading(false);

            toast('Error', {
                description: 'Something went wrong. Please try again.', 
            });
        }
    }

    return (
        <div className='border-b border-neutral-800 p-4'>
            <div className='flex flex-row gap-4'>
                <Avatar>
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>

                <div className='w-full'>
                    <textarea
                        className={`disabled:opacity-80 peer resize-none mt-2 w-full bg-black ring-0
                        outline-none text-sm placeholder-neutral-500 text-white h-12.5`}
                        placeholder={placeholder}
                        disabled={isLoading}
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                return onSubmit()
                            }
                        }}
                    >

                    </textarea>

                    <hr className='opacity-0 peer-focus:opacity-100 h-px w-full border-neutral-800 transition' />

                    <div className='flex flex-row justify-end mt-4'>
                        <Button
                            label={'Post'}
                            disabled={isLoading || !body}
                            className='rounded-md px-8 py-1'
                            onClick={onSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;