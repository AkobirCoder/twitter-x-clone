import Auth from '@/components/auth';
import React from 'react';

export default function Page() {
    const user = false;

    if (!user) {
        return (
            <div className='container h-screen max-w-7xl mx-auto'>
                <Auth />
            </div>
        );
    }

    return (
        <div>Page</div>
    );
}
