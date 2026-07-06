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

    if (session?.currentUser) {
        return (
            <div className='container h-screen max-w-7xl mx-auto'>
                <Auth />
            </div>
        );
    }

    return (
        <div className='lg:container h-screen mx-auto lg:max-w-7xl'>
            <div className='flex'>
                <Sidebar />
                <div className='flex flex-1 border-x border-neutral-800 lg:mx-4 ml-1'>
                    <div className='w-full'>
                        <NextTopLoader
                            color='#2299dd'
                            initialPosition={0.08}
                            crawlSpeed={200}
                            height={3}
                            crawl={true}
                            showSpinner={true}
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