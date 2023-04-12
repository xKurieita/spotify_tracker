
import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar';
import Center from '@/components/Center';
import { PlaylistType } from '@/types';
import { getSession } from 'next-auth/react';
import Player from '@/components/Player';

const AUTH_URL: string = 'https://api.spotify.com/v1';



export default function Home() {
  const [token, setToken] = useState<string>('')
  const [currentUser, setCurrentUser] = useState<any>(null);



  return (
    <div className='bg-black h-screen overflow-hidden'>
      <main className='flex'>
        <Sidebar />
        <Center /> 
      </main>
      <div className='sticky bottom-0 text-white'>
        <Player />
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);

    return {
        props: {
            session
        }
    }
};
