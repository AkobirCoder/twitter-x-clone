import Auth from '@/components/auth';
import { Toaster } from '@/components/ui/sonner';
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import React from 'react';
import NextTopLoader from 'nextjs-toploader';
import Sidebar from '@/components/sidebar/sidebar';
import FollowBar from '@/components/shared/follow-bar';

interface Props {
    children: React.ReactNode,
}

const Layout = async ({children}: Props) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <div className='container h-screen mx-auto max-w-7xl'>
                <Auth />
            </div>
        );
    }

    return (
        <div className='lg:container h-screen mx-auto lg:max-w-7xl'>
            <div className='flex'>
                <Sidebar user={JSON.parse(JSON.stringify(session.currentUser))} />
                <div className='flex flex-1 border-x border-neutral-800 lg:mx-4'>
                    <div className='w-full'>
                        <NextTopLoader
                            color='#2299dd'
                            initialPosition={0.08}
                            crawlSpeed={200}
                            height={3}
                            crawl={true}
                            showSpinner={false}
                            easing='ease'
                            speed={200}
                            shadow='0 0 10px #2299dd, 0 0 5px #2299dd'
                        />
                        {children}
                        <Toaster />
                    </div>
                </div>
                <FollowBar />
            </div>
        </div>
    );
}

export default Layout;