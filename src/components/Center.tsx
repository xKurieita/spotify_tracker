import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { signOut as nextAuthSignOut, useSession} from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { playlistIdState, playlistState } from '@/atoms/playlistAtom'
import { useRecoilState, useRecoilValue } from 'recoil'
import useSpotify from '@/hooks/useSpotify'
import Songs from './Songs'
import { debounce } from 'lodash'

const colors: string[] = [
    'from-indigo-500',
    'from-pink-500',
    'from-yellow-500',
    'from-green-500',
    'from-purple-500',
    'from-red-500',
    'from-blue-500',

];

const BOUNCE_DELAY = 300;





const Center: React.FC = () => {
    const {data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState<string>('')
    const playlistId = useRecoilValue(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState(playlistState)

    useEffect(() => {
        setColor(colors[Math.floor(Math.random() * colors.length)])
    }, [playlistId]);

    useEffect(() => {
        spotifyApi
        .getPlaylist(playlistId)
        .then((res) => {
            setPlaylist(res.body)
        }).catch((err) => {
            console.log(err)
        }
        ) 
    }, [spotifyApi, setPlaylist, playlistId]);

    const signOut = () => {
        nextAuthSignOut();
    }

    const debouncedSignOut = debounce(signOut, BOUNCE_DELAY);

    const handleSignOut = () => {
        debouncedSignOut();
    }

  return (
    <div className='flex-grow text-white h-screen overflow-y-scroll scrollbar-hide'>
        <header className='absolute top-5 right-8'>
            <div onClick={handleSignOut}>
            <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                {session?.user?.image && (
                 <Image src={session.user.image}  alt='Your profile picture ' className='rounded-full' width={40} height={40}/>
                )}
            
             <h2>{session?.user?.name}</h2>
             <ChevronDownIcon className='h-5 w-5'/>
            </div>
            </div>
        </header>
        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
        
       
        <div className="h-44 w-44 shadow-2xl">
        <Image src={playlist?.images?.[0].url} alt='Playlist cover' width={256} height={256} priority/>
        </div> 
        <div>
            <p>PLAYLISTS</p>
            <h1 className='text-2xl md:text-3xl xl:text-5xl'>
            {playlist?.name}
        </h1>
        </div>
        </section>
        <div>
            <Songs />
        </div>
    </div>
  )
}

export default Center
