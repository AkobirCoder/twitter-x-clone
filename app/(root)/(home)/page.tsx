"use client"

import Form from '@/components/shared/form';
import Header from '@/components/shared/header';
import PostItem from '@/components/shared/post-item';
import { IPost } from '@/types';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function Page() {
    const { data: session, status } = useSession();

    const [isLoading, setIsLoading] = useState(false);

    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                setIsLoading(true);

                const { data } = await axios.get('/api/posts?limit=10');

                setPosts(data);

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);

                console.log(error);
            }
        }

        getPosts();
    }, []);

    return (
        <>
            <Header 
                label='Home'
            />
            {
                isLoading || status === 'loading' ? (
                    <div className='flex items-center justify-center h-24'>
                        <Loader2 className='animate-spin text-sky-500' />
                    </div>
                ) : (
                    <>
                        <Form 
                            placeholder="What's on your mind" 
                            user={JSON.parse(JSON.stringify(session?.currentUser))}
                            setPosts={setPosts}
                        />
                        {
                            posts.map((post) => {
                                return (
                                    <PostItem 
                                        key={post._id} 
                                        post={post} 
                                        user={JSON.parse(JSON.stringify(session?.currentUser))}
                                        setPosts={setPosts}    
                                    />
                                );
                            })
                        }
                    </>
                )
            }
        </>
    );
}
