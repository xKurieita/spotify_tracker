export type UserType = {
    accessToken: string;
    email: string;
    name: string;
    image: string;
    refreshToken: string;
    username: string;
}

export type SessionType = {
    update?: (data?: Partial<UserType>) => void;
    data?: {
        user: UserType;
        expires: string;
        error?: string;
    };
    status?: 'loading' | 'authenticated' | 'unauthenticated';
}