'use client'
import {useCallback, useState, useTransition} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from './ui/button';
import Image from 'next/image';
import { X } from 'lucide-react';
import { uploadCertificate } from '@/actions/coach/uploadCertificates';
import { FormSuccess } from './form-success';
import { FormError } from './form-error';

const Dropzone = ({className}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [ isPending, startTransition] =  useTransition();
    const [files, setFiles] = useState([]);
    const [rejected, setRejected] = useState([]);
    const onDrop = useCallback((acceptedFiles: FileList,  rejectedFiles: FileList) => {
        if(acceptedFiles?.length){
            setFiles(previousFiles =>[
                ...previousFiles,
                ...acceptedFiles.map(file=>
                    Object.assign(file, {preview: URL.createObjectURL(file)})
                    )
            ])
        }

        if (rejectedFiles?.length) {
            setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
          }
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept:{
            "image/*": [],
            "application/pdf": ['.pdf'],
        },
        maxSize: 1024 * 5000,
        onDrop,
    })

      const removeFile = name => {
        setFiles(files => files.filter(file => file.name !== name))
      }

      const removeAll = () => {
        setFiles([])
        setRejected([])
      }

      const removeRejected = name => {
        setRejected(files => files.filter(({ file }) => file.name !== name))
      }

      const onSubmit = async e =>{
        e.preventDefault()
        setError('');
        setSuccess('');
        
        if(!files?.length) return
        const formData = new FormData()
        files.forEach(file => formData.append('fileList', file, file.name))
        startTransition(()=>{
          uploadCertificate(formData)
          .then((data)=> {
            setError(data.error)
            setSuccess(data.success)
            removeAll();
          })
        })
        
    
      }
    
      return (
        <form onSubmit={onSubmit}>
        <div>
            <div {...getRootProps(
            {
                className : className
            }
        )} >
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
          
        </div>
        </div>

        <section>
        <div className='flex mt-2 gap-4'>
          <h2 className='title text-3xl font-semibold'>Preview</h2>
          <Button
            type='button'
            variant="destructive"
            onClick={removeAll}
            className='mx-3'
          >
            Remove all files
          </Button>
          <Button
            type='submit'
            className='mx-3'
          >
            Upload
          </Button>
        </div> 
        <h3 className='title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3'>
          Accepted Files
        </h3>
        <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
          {files.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
              <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='h-full w-full object-contain rounded-md'
              />
              <button
                type='button'
                className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                onClick={() => removeFile(file.name)}
              >
                <X className='w-5 h-5 fill-white hover:fill-secondary-400 transition-colors' />
              </button>
              <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
                {file.name}
              </p>
            </li>
          ))}
        </ul>
         {/* Rejected Files */}
         <h3 className='title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3'>
          Rejected Files
        </h3>
        <ul className='mt-6 flex flex-col'>
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className='flex items-start justify-between'>
              <div>
                <p className='mt-2 text-neutral-500 text-sm font-medium'>
                  {file.name}
                </p>
                <ul className='text-[12px] text-red-400'>
                  {errors.map(error => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type='button'
                className='mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
        </section>
        <FormSuccess message={success}/>
        <FormError message={error}/>
        </form>
        
      )
}

export default Dropzone