
import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar';
import Center from '@/components/Center';

const AUTH_URL: string = 'https://api.spotify.com/v1'


export default function Home() {
  const [token, setToken] = useState<string>('')
  const [currentUser, setCurrentUser] = useState<any>(null);



  return (
    <div className='bg-black h-screen overflow-hidden'>
      <main className='flex'>
        <Sidebar />
        <Center /> 
      </main>
      <div>
        {/* player */}
      </div>
    </div>
  )
}
