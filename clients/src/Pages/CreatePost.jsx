import { FileInput, Select, TextInput, Button } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React from 'react'

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>CREATE THE POST</h1>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Title' required id='title'
                className='flex-1'/>
                <Select>
                    <option value="uncategorized">Select a Category</option>
                    <option value="technical domain">Technical Domain</option>
                    <option value="travel">Travel</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="social media">Social Media</option>
                    <option value="motorized vehicle">Motorized Vehicle</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dashed p-3'>
                <FileInput type='file' accept='image/*'/>
                <Button type='button' gradientDuoTone='greenToBlue' size='sm'> Upload Image</Button>
            </div>
            <ReactQuill theme="snow" placeholder='Write Something...' className='h-72 mb-12' required />
            <Button type='submit' gradientDuoTone='pinkToOrange'> Publish </Button>
        </form>
    </div>
  )
}
