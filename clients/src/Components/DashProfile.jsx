import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
    const { currentUser } = useSelector(state => state.user);
    const [ imageFile, setImageFile ] = useState(null);
    const [ imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    
    const filePickerRef = useRef();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
        
    };
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);
    const uploadImage = async () => {
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read;
        //         allow write: if 
        //         request.resource.size < 2 * 1024 * 1024 &&
        //         request.resource.contentType.matches('image/.*')
        //       }
        //     }
        //   }
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask =  uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                 setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                 setImageFileUploadError('Could not upload the image (File must be less than 2MB)');
                 setImageFileUploadProgress(null);
                 setImageFile(null);
                 setImageFileUrl(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                });
            }
        );
    }; 
    
    return (
        <div className='w-full flex flex-col items-center p-5'>
            <h1 className='mt-10 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col items-center mt-5 gap-4 w-full max-w-md'>
                <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
                <div className='relative w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
                    {imageFileUploadProgress && ( <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} strokeWidth={5}
                    styles={{
                        root: {
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        },
                        path: {
                            stroke: `rgba(62, 152, 199, ${
                              imageFileUploadProgress / 100
                            })`,
                          },
                    }}
                    />)}
                    <img 
                        src={ imageFileUrl || currentUser.profilePicture} 
                        alt="user" 
                        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                            imageFileUploadProgress &&
                            imageFileUploadProgress < 100 &&
                            'opacity-60'
                          }`} 
                    />
                </div> 
                {imageFileUploadError && ( <Alert color='failure'>{imageFileUploadError}</Alert>)}
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
