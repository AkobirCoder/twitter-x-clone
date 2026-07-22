"use client"

import { IPost, IUser } from '@/types';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { sliceText } from '@/lib/utils';
import { formatDistanceToNowStrict } from 'date-fns';
import { FaHeart } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

interface Props {
    comment: IPost,
    user: IUser,
    comments: IPost[],
    setComments: React.Dispatch<React.SetStateAction<IPost[]>>,
}

const CommentItem = ({comment, user, comments, setComments}: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const onLike = async () => {
        try {
            setIsLoading(true);

            if (comment.hasLiked) {
                await axios.delete('/api/comments', {
                    data: {
                        commentId: comment._id,
                    }
                });

                const updatedComments = comments.map((c) => {
                    if (c._id === comment._id) {
                        return {
                            ...c,
                            hasLiked: false,
                            likes: c.likes - 1,
                        }
                    }

                    return c;
                });

                setComments(updatedComments);
            } else {
                await axios.put('/api/comments', {
                    commentId: comment._id,
                });

                const updatedComments = comments.map((c) => {
                    if (c._id === comment._id) {
                        return {
                            ...c,
                            hasLiked: true,
                            likes: c.likes + 1,
                        }
                    }

                    return c;
                });

                setComments(updatedComments);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);

            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/comments/${comment._id}`);

            setComments((prevState) => {
                return prevState.filter((c) => {
                    return c._id !== comment._id
                });
            });

            setIsLoading(false);
        } catch (error) {
            console.log(error);

            setIsLoading(false);
        }
    }

    return (
        <div
            className={`border-b p-5 cursor-pointer bg-neutral-800 hover:bg-neutral-900 transition relative`}
        >
            {
                isLoading && (
                    <div className='absolute inset-0 w-full h-full bg-black opacity-50'>
                        <div className='flex items-center justify-center h-full'>
                            <Loader2 className='animate-spin text-sky-500' />
                        </div>
                    </div>
                )
            }
            <div className='flex flex-row items-center gap-3'>
                <Avatar>
                    <AvatarImage src={comment.user.profileImage} />
                    <AvatarFallback>
                        {comment.user.name[0]}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className='flex flex-row items-center gap-2'>
                        <p className='text-white text-sm cursor-pointer hover:underline'>
                            {comment.user.name}
                        </p>
                        <span className='text-neutral-500 text-sm cursor-pointer hover:underline hidden md:block'>
                            {
                                comment?.user.username ? (
                                    `@${sliceText(comment.user.username, 25)}`
                                ) : (
                                    sliceText(comment.user.email, 25)
                                )
                            }
                        </span>
                        <span className='text-neutral-500 text-sm'>
                            {
                                formatDistanceToNowStrict(new Date(comment.createdAt))
                            } ago
                        </span>
                    </div>
                    <div className='text-white mt-1 text-sm'>
                        {comment.body}
                    </div>
                    <div className='flex flex-row items-center mt-3 gap-5'>
                        <div
                            className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer
                            hover:text-red-500 transition`}
                            onClick={onLike}
                        >
                            <FaHeart size={15} color={comment.hasLiked ? 'red' : ''} />
                            <p>{comment.likes || 0}</p>
                        </div>

                        {
                            comment.user._id === user._id && (
                                <div
                                    className={`flex flex-row items-center gap-2 text-neutral-500
                                    cursor-pointer hover:text-red-500 transition`}
                                    onClick={onDelete}
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

export default CommentItem;