"use client"

import { IPost, IUser } from '@/types';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { sliceText } from '@/lib/utils';
import { formatDistanceToNowStrict } from 'date-fns'; 
import { AiFillDelete, AiOutlineMessage } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'sonner';

const PostItem = ({post, user}: {post: IPost, user: IUser}) => {
    const onDelete = async () => {
        try {
            
        } catch (error) {
            toast('Error', {
                description: 'Something went wrong. Please try again later.',
            });
        }
    }

    return (
        <div
            className={`border-b border-neutral-800 p-5 cursor-pointer
            hover:bg-neutral-900 transition`}
        >
            <div className='flex flex-row items-center gap-3'>
                <Avatar>
                    <AvatarImage src={post.user.profileImage} />
                    <AvatarFallback>
                        {post.user.name[0]}
                    </AvatarFallback>
                </Avatar>

                <div>
                    <div className='flex flex-row items-center gap-2'>
                        <p className='text-white text-sm cursor-pointer hover:underline'>
                            {post.user.name}
                        </p>
                        <span className='text-neutral-500 text-sm cursor-pointer hover:underline hidden md:block'>
                            {
                                post.user.username ? (
                                    `${sliceText(post.user.username, 25)}`
                                ) : (
                                    sliceText(post.user.email, 25)
                                )
                            }
                        </span>
                        <span className='text-neutral-500 text-sm'>
                            {
                                formatDistanceToNowStrict(new Date(post.createdAt))
                            } ago
                        </span>
                    </div>

                    <div className='text-white mt-1 text-sm'>
                        {post.body}
                    </div>

                    <div className='flex flex-row items-center mt-3 gap-5'>
                        <div
                            className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer
                            hover:text-sky-500 transition`}
                        >
                            <AiOutlineMessage size={15} />
                            <p>{post.comments.length || 0}</p>
                        </div>

                        <div
                            className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer
                            hover:text-red-500 transition`}
                        >
                            <FaHeart size={15} />
                            <p>{post.likes.length || 0}</p>
                        </div>

                        {
                            post.user._id === user._id && (
                                <div
                                    className={`flex flex-row items-center gap-2 text-neutral-500
                                    cursor-pointer hover:text-red-500 transition`}
                                >
                                    <AiFillDelete size={15} />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostItem;