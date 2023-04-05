import { signIn,useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { SessionType } from "@/types";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi(
    {
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        redirectUri: process.env.NEXTAUTH_URL,
    });


const useSpotify = () => {
    const {data: session, status} = useSession() as unknown as SessionType;
    console.log(session)

    useEffect(() => {
        if (session) {
          if (session?.error === 'RefreshAccessTokenError') {
            signIn()
          }
          spotifyApi.setAccessToken(session?.user?.accessToken)
        }
        
    }, [session]);

  return spotifyApi;
}

export default useSpotify
