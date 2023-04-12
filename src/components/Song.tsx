import useSpotify from "@/hooks/useSpotify";
import Image from "next/image";
import React from "react"
import { millisecondsToMinutesAndSeconds } from "../../lib/time";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";

interface SongProps {
    order: number
    track: any
    key: string
}

const Song: React.FC<SongProps> = (props: SongProps) => {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const playSong = (track: any) => {
        console.log(track)
        setCurrentTrackId(track.track.id)
        setIsPlaying(true)
        spotifyApi.play({
            uris: [track.track.uri]
        })
    }

  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
        <div className="flex items-center space-x-4 " onClick={() => playSong(props.track)}>
            <p>{props.order + 1}</p>
            <Image src={props.track.track.album.images[0].url } alt="" width={40} height={40}/> 
            <div>
                <p className="w-36 lg:w-64 truncate text-white">{props.track.track.name}</p>
                <p className="w-40">{props.track.track.artists[0].name}</p>
            </div>
        </div>
        <div className="flex items-center justify-between ml-auto md:ml-0">
            <p className="w-40 hidden md:inline">{props.track.track.album.name}</p>
            <p className="pr-6">{millisecondsToMinutesAndSeconds(props.track.track.duration_ms)}</p>
        </div>
    </div>
  )
}

export default Song
