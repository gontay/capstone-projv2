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
import { ArrowRight, MoreHorizontal } from 'lucide-react'
import { RequestStatus } from '@prisma/client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'



interface RequestDisplayProps{
  coachId :string
}

const RequestDisplay = async(
  {coachId} : RequestDisplayProps
) => {
  const requests : RequestProps[] = await getRequests(coachId)
  requests.map((req)=> console.log(req.requestStatus))
  return (
    <div>
      <h1>Your Requests</h1>
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">User</TableHead>
          <TableHead>Message</TableHead>
          <TableHead className="text-right">Response</TableHead>
          <TableHead className="text-right">More</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((req)=>(
          <TableRow key={req.id}>
            <TableCell>{req.requestorName}</TableCell>
            <TableCell>{req.message}</TableCell>
            <TableCell className='text-right'>
            {req.requestStatus === RequestStatus.PENDING &&
            <>
            <RequestResponseButton requestId={req.id} type="Accept"/>
              <RequestResponseButton requestId={req.id} type="Reject"/>
            </> 
            }
            {req.requestStatus === RequestStatus.APPROVED && 
             <p>{req.requestStatus}</p>}
            {req.requestStatus === RequestStatus.REJECTED &&
             <p>{req.requestStatus}</p>}

            </TableCell>          
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                  <Link href={`/profile/${req.requestorId}`}><Button variant='link'>View Profile</Button></Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                  {req.requestStatus === RequestStatus.APPROVED && <RequestResponseButton requestId={req.id} type="Undo" variant='link'/>}
                  {req.requestStatus === RequestStatus.REJECTED && <RequestResponseButton requestId={req.id} type="Undo" variant='link'/>}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <Link href={`/profile/${req.requestorId}`}><ArrowRight/></Link> */}
            </TableCell>
          </TableRow>
        ))
        } 
      </TableBody>
      </Table>
    </div>
  )
}

export default RequestDisplay