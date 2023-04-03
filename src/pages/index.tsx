import  Login  from '../components/Login'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Image from 'next/image';
import UserInfo from '@/components/UserInfo';

const AUTH_URL: string = 'https://api.spotify.com/v1'


export default function Home() {
  const [token, setToken] = useState<string>('')
  const [currentUser, setCurrentUser] = useState<any>(null);

  
  useEffect(() => {

    const fetchProfile = async  (_token : string): Promise<any> => {
      const res = await axios.get(`${AUTH_URL}/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    setCurrentUser(res.data)
    console.log(res.data)
    return res.data
  }
  fetchProfile(token)

  }, [token])



  return (
    <>
      <main className='bg-neutral-800 min-h-screen'>
        { currentUser ? (
          <UserInfo currentUser={currentUser}/>
        ) :
        <Login token={token} setToken={setToken}/> }
      </main>
    </>
  )
}
