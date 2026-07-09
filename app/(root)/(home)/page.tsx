// import Auth from '@/components/auth';
import Form from '@/components/shared/form';
import Header from '@/components/shared/header';
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function Page() {
    // const user = false;

    // if (!user) {
    //     return (
    //         <div className='container h-screen max-w-7xl mx-auto'>
    //             <Auth />
    //         </div>
    //     );
    // }

    const session = await getServerSession(authOptions);

    return (
        <>
            <Header 
                label='Home' 
                isBack 
            />
            <Form 
                placeholder="What's on your mind" 
                user={JSON.parse(JSON.stringify(session?.currentUser))} 
            />
        </>
    );
}
