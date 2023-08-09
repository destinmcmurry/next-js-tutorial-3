import React, { Suspense } from 'react';
import getUser from '@/lib/getUser';
import getUserPosts from '@/lib/getUserPosts';
import UserPosts from './components/UserPosts';
import type { Metadata } from 'next';
import getAllUsers from '@/lib/getAllUsers';
import { notFound } from 'next/navigation';

type Params = {
    params: {
        userId: string;
    };
};

export async function generateMetadata({
    params: { userId },
}: Params): Promise<Metadata> {
    const userData: Promise<User> = getUser(userId);
    const user: User = await userData;

    if (!user) notFound();

    return {
        title: user.name,
        description: `${user.name}'s Posts`,
    };
}

export default async function UserPage({ params: { userId } }: Params) {
    const userData: Promise<User> = getUser(userId);
    const userPostsData: Promise<Post[]> = getUserPosts(userId);

    const user = await userData;

    if (!user) notFound();

    return (
        <div>
            <h2>{user.name}</h2>
            <br />
            <Suspense fallback={<h2>Loading...</h2>}>
                <UserPosts promise={userPostsData} />
            </Suspense>
        </div>
    );
}

// SSG statically generate params
// can make initial load times slow when there's a lot
// will still rely on ISR policy for regenerating
export async function generateStaticParams() {
    const usersData: Promise<User[]> = getAllUsers();
    const users = await usersData;
    return users.map((user) => ({
        userId: user.id.toString(),
    }));
}
