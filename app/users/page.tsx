import React from 'react';
import type { Metadata } from 'next';
import getAllUsers from '@/lib/getAllUsers';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Users',
};

export default async function UsersPage() {
    const usersData: Promise<User[]> = getAllUsers();
    const users = await usersData;

    const content = (
        <section>
            <h2>
                <Link href='/'>Back to Home</Link>
            </h2>
            <br />
            {users.map((user) => (
                <Link href={`/users/${user.id}`}>
                    <p key={user.id}>{user.name}</p>
                    <br />
                </Link>
            ))}
        </section>
    );
    return content;
}
