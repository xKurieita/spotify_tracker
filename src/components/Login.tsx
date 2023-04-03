import axios from 'axios'
import React, { useEffect } from 'react'

const CLIENT_ID: string = 'a76ad1d05c4b451ea5a57004db98d9da'
const AUTH_ENDPOINT: string = 'https://accounts.spotify.com/authorize'
const REDIRECT_URI: string = 'http://localhost:3000'
const RESPONSE_TYPE: string = 'token'

interface LoginProps {
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>  
}


const Login: React.FC<LoginProps>= ({token, setToken}: LoginProps) => {

  useEffect(() => {
    //Retrieve the hash from the URL
    const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial: any, item: any) => {
      if (item) {
        const parts = item.split('=')
        initial[parts[0]] = decodeURIComponent(parts[1])
      }
      return initial
    }, {})

    //Clear the hash in the URL
    window.location.hash = ''
    //get the access token from the hash
    let _token: string = hash.access_token
    //if the token exists, set it to the state
    if (_token) {
      localStorage.setItem('token', _token)
    }
    /*
    * Fetches the user profile using the access token
    * @param _token The access token
    * @returns The user profile data
    */
    
  }, [])

  return (
    <div className='flex justify-center items-center h-screen'>
      <button className='bg-green-500 hover:bg-green-600 text-white font-bold p-4 px-4 rounded-full' >
        <a  className='text-xl' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login With Spotify</a>
      </button>
    </div>
  )
}

export default Login;
