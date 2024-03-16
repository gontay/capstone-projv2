import { getClients } from '@/lib/utils'
import { clientProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

type CoachNotebookProps = {
    coachId :string
}

const ClientNotebookDisplay = async({
    coachId
}: CoachNotebookProps) => {
    console.log(coachId)
    const clients : clientProps[] = await getClients(coachId)
    console.log("clients", clients)
  return (
    <div className='grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-2 px-2'>
    <h1>Your Clients</h1>
    {
        clients.map((client)=>
        <div className='daisy-card w-[200px] bg-slate-100 shadow-lg' key={client.id}>
          <figure className='p-3'>
            {client.image ?(
            <Image src={client.image}
             width={100}
             height={233}
             alt='profile'
            />
            ):(
              <Image src={'/profile-avatar.jpg'}
              width={100}
              height={233}
              alt='profile'
             />
            )}
            
          </figure>
          <div className='daisy-card-body items-center text-center '>
            <h2 className='daisy-card-title'>{client.name}</h2>
            {client.bio ? (<p>{client.bio}</p>):(<p>Client has not added bio</p>)}
            <div className='daisy-card-actions items-center text-center'>
            <Link href={`/notebook/${client.id}`}><Button>Open Notebook</Button></Link>
          </div>
          </div>
        </div>
    )}
</div>
  )

}

export default ClientNotebookDisplay