import NextAuth from "next-auth/next";
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi ,{ LOGIN_URL } from '../../../../lib/spotify'

const refreshAccessToken = async (token) => {
    try {
        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log('The access token has been refreshed!', refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // Replace with new if it exists else keep old token
        }
        
    } catch (error) {
        console.error(error)
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        }
    }
}

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL,
        })
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({token, account, user}) {
            // initial login
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.accessToken,
                    refreshToken: account.refreshToken,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000,
                };
            }

            // return token if access token is still valid
            if (Date.now() < token.accessTokenExpires) {
                return token
            }

            //Access token has expired, refresh it
            console.log('refreshing token');
            return await refreshAccessToken(token);
        },

        async session({ session, token }) {
            //send error 
            if (token.error) {
                return {
                    ...session,
                    error: token.error,
                }
            }
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;
            return session;
        }
    },
})


