import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import { useSelector } from 'react-redux';

export default function DashProfile() {
    const { currentUser } = useSelector(state => state.user);

    if (!currentUser) {
        return <p>Loading...</p>;
    }

    return (
        <div className='w-full flex flex-col items-center p-5'>
            <h1 className='mt-10 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col items-center mt-5 gap-4 w-full max-w-md'>
                <div className='w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full'>
                    <img 
                        src={currentUser.profilePicture} 
                        alt="user" 
                        className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' 
                    />
                </div> 
                <TextInput 
                    type='text' 
                    id='username' 
                    placeholder='Username' 
                    defaultValue={currentUser.username} 
                    className='w-full p-2 md:p-3 lg:p-4 text-lg md:text-xl lg:text-2xl'
                />
                <TextInput 
                    type='email' 
                    id='email' 
                    placeholder='Email' 
                    defaultValue={currentUser.email} 
                    className='w-full p-2 md:p-3 lg:p-4 text-lg md:text-xl lg:text-2xl'
                />
                <TextInput 
                    type='password' 
                    id='password' 
                    placeholder='Password' 
                    className='w-full p-2 md:p-3 lg:p-4 text-lg md:text-xl lg:text-2xl'
                />
               <Button 
               type='submit'  
               className='w-full max-w-xs p-2 md:text-lg bg-transparent text-gray-400 
               hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 
               hover:text-white border border-gray-300'
               >
                 Update
               </Button>
            </form>
            <div className='text-red-500 flex justify-between w-full max-w-md mt-5'>
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </div>
    );
}
