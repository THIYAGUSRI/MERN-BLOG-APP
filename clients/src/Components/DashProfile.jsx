import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess } from '../redux/user/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from 'react-router-dom'
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
    const { currentUser, error, loading } = useSelector(state => state.user);
    const [ imageFile, setImageFile ] = useState(null);
    const [ imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const filePickerRef = useRef();
    const dispatch = useDispatch();
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
        setImageFileUploading(true);
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
                 setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({...formData, profilePicture: downloadURL });
                    setImageFileUploading(false);
                });
            }
        );
    }; 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
            setUpdateUserError('No changes made');
            return;
        }
        if (imageFileUploading) {
            setUpdateUserError('Please wait for image to upload');
            return;
        }
        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
              const data =await res.json();
              if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
              }
              else{
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User's profile updated successfully");
              }
        } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message);
        }
      }
      const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
              method: 'DELETE',
            });
            const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      } 
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
      };

      const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
              method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
              console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
          } catch (error) {
            console.log(error.message);
          }
      };
    return (
        <div className='w-full flex flex-col items-center p-5'>
            <h1 className='mt-10 text-center font-semibold text-3xl'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center mt-5 gap-4 w-full max-w-md'>
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
                    onChange={handleChange}
                />
                <TextInput 
                    type='email' 
                    id='email' 
                    placeholder='Email' 
                    defaultValue={currentUser.email} 
                    className='w-full p-2 md:p-3 lg:p-4 text-lg md:text-xl lg:text-2xl'
                    onChange={handleChange}
                />
                <TextInput 
                    type='password' 
                    id='password' 
                    placeholder='Password' 
                    className='w-full p-2 md:p-3 lg:p-4 text-lg md:text-xl lg:text-2xl'
                    onChange={handleChange}
                />
               <Button 
               type='submit'  
               className='w-full max-w-xs p-2 md:text-lg bg-transparent text-gray-400 
               hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 
               hover:text-white border border-gray-300' disabled={ loading || imageFileUploading}>
                 { loading ? 'loading...': 'Update'}
               </Button>
               { currentUser.isAdmin && (
                <Link to={'/create-post'}>
                  <div className="w-full flex justify-center">
                    <Button
                    type='button'
                    gradientDuoTone='purpleToPink'
                    className='w-full max-w-lg'>
                     Create the Post
                    </Button>  
                  </div>
                </Link>
               )}
            </form>
            <div className='text-red-500 flex justify-between w-full max-w-md mt-5'>
                <span onClick={() => setShowModal(true)} className='cursor-pointer'>Delete Account</span>
                <span onClick={handleSignout} className='cursor-pointer'>Sign Out</span>
            </div>
            {updateUserSuccess && ( <Alert color='success' className='mt-5'> {updateUserSuccess} </Alert> )}
            {updateUserError && ( <Alert color='failure' className='mt-5'> {updateUserError} </Alert> )}
            {error && ( <Alert color='failure' className='mt-5'> {error} </Alert> )}
            <Modal
             show={showModal}
             onClose={() => setShowModal(false)}
             popup
             size='md'>
                <Modal.Header />
                <Modal.Body>
                   <div className='text-center'>
                     <HiOutlineExclamationCircle className='w-14 h-14 text-gray-500 dark:text-gray-200 mb-4 mx-auto' />
                     <h3 className='mb=5 text-lg text-gray-500 dark:text-gray-200'>
                        Are you sure you want to delete your account?
                     </h3>
                     <div className='flex justify-center gap-4'>
                       <Button color='failure' onClick={handleDeleteUser}>
                           Yes, I'm sure
                       </Button>
                       <Button color='gray' onClick={() => setShowModal(false)}>
                           No, cancel
                       </Button>
                     </div>
                   </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
