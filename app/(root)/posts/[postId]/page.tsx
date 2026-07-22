"use client"

import CommentItem from '@/components/shared/comment-item';
import Form from '@/components/shared/form';
import Header from '@/components/shared/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { sliceText } from '@/lib/utils';
import { IPost } from '@/types';
import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const { data: session, status } = useSession();

    const params = useParams<{ postId: string }>();

    const [isLoading, setIsLoading] = useState(false);

    const [isFetchingComment, setIsFetchingComment] = useState(false);

    const [post, setPost] = useState<IPost | null>(null);

    const [comments, setComments] = useState<IPost[]>([]);

    const getPost = async () => {
        try {
            setIsLoading(true);

            const { data } = await axios.get(`/api/posts/${params.postId}`);

            setPost(data);

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);

            console.log(error);
        }
    }

    const getComments = async () => {
        try {
            setIsFetchingComment(true);

            const { data } = await axios.get(`/api/posts/${params.postId}/comments`);

            setComments(data);

            setIsFetchingComment(false);
        } catch (error) {
            setIsFetchingComment(false);

            console.log(error);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getPost();

        getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!post) {
        return null;
    }

    // console.log(comments);
    
    return (
        <>
            <Header 
                label={'Posts'}
                isBack
            />

            {
                isLoading || status === 'loading' ? (
                    <div className='flex items-center justify-center h-24'>
                        <Loader2 className='animate-spin text-sky-500' />
                    </div>
                ) : (
                    <>
                        <div
                            className={`border-b p-5 cursor-pointer bg-neutral-900 transition`}
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
                                                post?.user.username ? (
                                                    `@${sliceText(post.user.username, 25)}`
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
                                </div>
                            </div>
                        </div>

                        <Form
                            placeholder="Post your reply?" 
                            user={JSON.parse(JSON.stringify(session?.currentUser))}
                            setPosts={setComments}
                            postId={params.postId}
                            isComment
                        />

                        {
                            isFetchingComment ? (
                                <div className='flex items-center justify-center h-24'>
                                    <Loader2 className='animate-spin text-sky-500' />
                                </div>
                            ) : (
                                comments.map((comment) => {
                                    return (
                                        <CommentItem 
                                            key={comment._id} 
                                            comment={comment} 
                                            user={JSON.parse(JSON.stringify(session?.currentUser))}
                                            setComments={setComments}
                                            comments={comments}
                                        />
                                    );
                                })
                            )
                        }
                    </>
                )
            }
        </>
    );
}

export default Page;