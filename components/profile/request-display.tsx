import { currentUser } from '@/lib/auth'
import { getClientRequests } from '@/lib/utils';
import { ClientRequestProps } from '@/types';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import React from 'react'
import { RequestStatus } from '@prisma/client';
import { Card, CardContent, CardHeader } from '../ui/card';


const ClientRequestDisplay = async() => {
    const user = await currentUser(); 
    const requests: ClientRequestProps[] = await getClientRequests(user?.id)
  return (
    <Card className="w-[600px]">
    <CardHeader>
        <p className="text-2xl font-semibold text-center">
            My Requests
        </p>
    </CardHeader>
    <CardContent >
    <div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Coach</TableHead>
          <TableHead className="">Response Status</TableHead>
          <TableHead className="">Rejection Reason</TableHead>
        </TableRow>
      </TableHeader>
        <TableBody>
            {requests.map((req)=>(
                <TableRow key={req.id}>
                    <TableCell>{req.coachName}</TableCell>
                    <TableCell>{req.requestStatus}</TableCell>
                    {req.requestStatus=== RequestStatus.REJECTED && req.rejectionReason && <TableCell>{req.rejectionReason}</TableCell>
                    }
                </TableRow>
            ))}
        </TableBody>
    </Table>
    </div>
    </CardContent>
    </Card>
  )
}

export default ClientRequestDisplay