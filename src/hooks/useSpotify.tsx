import { signIn,useSession } from "next-auth/react";
import React, { useEffect } from "react";


interface session{
    user: {
        name: string;
        email: string;
        image: string;
    },
    expires: string;
    accessToken: string;
    error?: string;
}



const useSpotify: React.FC<session> = ({error}: session) => {
    const {data: session, status} = useSession();
    console.log(useSession)

    useEffect(() => {
        if (session){
        }

    }, [session]);

  return (
    <div>
      
    </div>
  )
}

export default useSpotify
