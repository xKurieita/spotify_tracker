import React from 'react'
import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image';

interface LoginProps {
    providers: {
        [provider: string]: {   
        id: string;
        name: string;
        type: string;
        signinUrl: string;
        callbackUrl: string;
        csrfToken: string;
    }
    }


}

const Login: React.FC<LoginProps> = ({providers}) => {
  return (
    <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
        <Image src='/spotify_logo.webp' width={175} height={175} className='mb-10' alt='Spotify logo'/>
        {Object.values(providers).map((provider) => (
            <div key={provider.name}>
                <button  className='bg-[#18d860] text-white p-4 rounded-full' onClick={() => signIn(provider.id, { callbackUrl: '/'})}>
                    Sign in with {provider.name}
                </button>
            </div>
         ) )}
    </div>
  )
}

export default Login;

export const getServerSideProps = async () => {
    const providers = await getProviders();

    return {
        props: { 
            providers 
        }

    }
}
