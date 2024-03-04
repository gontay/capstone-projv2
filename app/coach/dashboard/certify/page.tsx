import Dropzone from '@/components/dropzone'
import React from 'react'

const Certificateage = () => {
  return (
    <div className='mx-3'>
        <h1 className='text-lg font-semibold'>Upload your certificates here</h1>
        <Dropzone className="p-16 mt-10 border border-neutral-200"/>
    </div>
  )
}

export default Certificateage