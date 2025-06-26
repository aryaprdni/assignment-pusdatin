export function fakeLogin(email: string, password: string) {
    const users = [
        {
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin',
            token: 'fake-jwt-token-admin',
        },
        {
            email: 'user@example.com',
            password: 'user123',
            role: 'user',
            token: 'fake-jwt-token-user',
        },
    ];

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return null;

    return {
        token: user.token,
        user: { email: user.email, role: user.role },
    };
}
