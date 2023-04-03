import React from 'react'
import Image from 'next/image'

interface UserInfoProps {
  currentUser: any
}


const UserInfo: React.FC<UserInfoProps> = ({currentUser} : UserInfoProps) => {
  return (
    <div className='flex justify-center p-40 bg-user-linear-gradient text-center align-center'>
        <div>
            <div className='w-36 h-40'>
            <div className='rounded-full overflow-hidden'>
            <Image src={`${currentUser.images[0].url}`} alt='Your profile picture' width={150} height={150}/>
            </div>
            </div>
             <a className='text-2xl bold text-white hover:text-green-600 font-mons' href={currentUser.external_urls.spotify} target='_blank'>{currentUser.display_name}</a>
              <div className=''>
                <p className='text-xl text-green-600'>{currentUser.followers.total}</p>
                <p className='text-xl text-white'>Followers</p>
              </div>
          </div>
    </div>
  )
}

export default UserInfo
