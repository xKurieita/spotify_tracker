/* eslint-disable react-hooks/exhaustive-deps */
import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom';
import useSongInfo from '@/hooks/useSongInfo';
import useSpotify from '@/hooks/useSpotify';;
import { FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, RewindIcon, SwitchHorizontalIcon, VolumeOffIcon, VolumeUpIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import React, { useState, useEffect, useCallback } from 'react'
import { useRecoilState } from 'recoil';
import { debounce } from 'lodash';



const Player = () => {
    const spotifyApi = useSpotify();
    const {data: session } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState<number>(50);

    const songInfo = useSongInfo();

    const fetchCurrentTrack = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((res: any) => {
                setCurrentTrackId(res.body?.item?.id)

                spotifyApi.getMyCurrentPlaybackState().then((res: any) => {
                    setIsPlaying(res.body?.is_playing)
                }); 

            }) 
        }
    }

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((res: any) => {
            if (res.body?.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
    }
    )};


    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentTrack();
            setVolume(50);
        } 

    }, [currentTrackId, spotifyApi, session]);

    const debouncedAdjustVolume = useCallback(
        debounce((volume: number) => {
            spotifyApi.setVolume(volume).catch((err: any) => {
            }
            )
    }, 500)
    , [spotifyApi])

    const debouncedAdjustVolume = useCallback(
        debounce((volume: number) => {
            spotifyApi.setVolume(volume).catch((err: any) => {
                // Handle error
                throw Error(err);
            });
        }, 500)
    , [spotifyApi]);

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }

    }, [debouncedAdjustVolume,volume])



  return (
    <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
        {/* left */}
        <div className='flex items-center space-x-4'>
            <div className='hidden md:inline h-10 w-10' >
                 <Image src={songInfo?.album?.images?.[0]?.url} alt="" width={50} height={50}/>
            </div>
            <div>
                <h3>{songInfo?.name}</h3>
                <p>{songInfo?.artists?.[0]?.name}</p>
            </div>
        </div>
        {/* center */}
        <div className='flex items-center justify-evenly'> 
            <SwitchHorizontalIcon className='button' />
            <RewindIcon className='button' onClick={() => spotifyApi.skipToPrevious()} />

            {isPlaying ? ( 
                <PauseIcon className='button w-10 h-10' onClick={handlePlayPause} />
            ) : (
                <PlayIcon className='button w-10 h-10' onClick={handlePlayPause} />
            )}
            <FastForwardIcon className='button' onClick={() => spotifyApi.skipToNext()} />
            <ReplyIcon className='button' onClick={() => spotifyApi.skipToNext()} />

        </div>

        {/* right */}
        <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
            <VolumeOffIcon className='button' onClick={() => volume > 0 && setVolume(volume - 10)}/>
            <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className='w-14 md:w-28' />
            <VolumeUpIcon className='button' onClick={() => volume < 100 && setVolume(volume + 10)}/>
        </div>
    </div>
  )
}

export default Player
