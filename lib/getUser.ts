export default async function getUser(userId: string) {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!res.ok) return undefined; // for custom 404 page, to avoid hitting the error boundary
    // throw new Error('failed to fetch user');
    return res.json();
}
