import { playlistState } from "@/atoms/playlistAtom"
import { useRecoilValue } from "recoil"
import Song from "./Song"

const Songs = () => {
    const playlist = useRecoilValue(playlistState)
  return (
    <div className="text-white flex flex-col space-y-1 pb-28">
        {playlist?.tracks?.items?.map((item: any, i: number) => ( 
                <Song key={item.track.id} track={item} order={i}/>
        ))}
      
    </div>
  )
}

export default Songs
