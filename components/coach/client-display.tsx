import { getClients } from '@/lib/utils'
import { clientProps } from '@/types'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from 'lucide-react'
import ViewNotebookButton from './view-notebook-button'

interface ClientDisplayProps{
    coachId :string
  }
  

const ClientDisplay = async(
    {coachId} : ClientDisplayProps
) => {
    const clients : clientProps[] = await getClients(coachId)
  return (
    
    <div>
    <h1>Your clients</h1>
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">User</TableHead>
        <TableHead>Bio</TableHead>
        <TableHead className="text-right"></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {clients.map((client)=>(
        <TableRow key={client.id}>
          <TableCell className=''>
            <Avatar>
                <AvatarImage src={client.image||""}/>
                <AvatarFallback className="bg-slate-400">
                    <User className="text-white"/>
                </AvatarFallback>
            </Avatar>
            {client.name}
            </TableCell>
          <TableCell>{client.bio}</TableCell>
          <TableCell className='text-right'><ViewNotebookButton notebookId={client.id}/></TableCell>
        </TableRow>
      ))
      }
    </TableBody>
    </Table>
  </div>
  )
}

export default ClientDisplay