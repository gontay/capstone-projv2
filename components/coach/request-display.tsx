import { getRequests } from '@/lib/utils'
import { RequestProps } from '@/types'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '../ui/button'
import RequestResponseButton from './request-response-button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'



interface RequestDisplayProps{
  coachId :string
}

const RequestDisplay = async(
  {coachId} : RequestDisplayProps
) => {
  const requests : RequestProps[] = await getRequests(coachId)
  
  return (
    <div>
      <h1>Your Requests</h1>
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">User</TableHead>
          <TableHead>Message</TableHead>
          <TableHead className="text-right">Response</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((req)=>(
          <TableRow key={req.id}>
            <TableCell>{req.requestorName}</TableCell>
            <TableCell>{req.message}</TableCell>
            <TableCell className='text-right'><RequestResponseButton requestId={req.id} type="Accept"/><RequestResponseButton requestId={req.id} type="Reject"/></TableCell>
            <TableCell><Link href={`/profile/${req.requestorId}`}><ArrowRight/></Link></TableCell>
          </TableRow>
        ))
        }
      </TableBody>
      </Table>
    </div>
  )
}

export default RequestDisplay