
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Image from 'next/image';
import UserInfo from '@/components/UserInfo';
import Sidebar from '@/components/Sidebar';

const AUTH_URL: string = 'https://api.spotify.com/v1'


export default function Home() {
  const [token, setToken] = useState<string>('')
  const [currentUser, setCurrentUser] = useState<any>(null);



  return (
    <div className='bg-black h-screen overflow-hidden'>
      <main className=''>
        <Sidebar />
          
      </main>
      <div>
        {/* player */}
      </div>
    </div>
  )
}
