import { getCoachByUserId } from '@/data/coach/coach'
import { currentUser } from '@/lib/auth'
import { getAllCoachbyUserId } from '@/lib/utils'
import { CoachProps } from '@/types'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '../ui/card'

const CoachDisplay = async() => {
const user = await currentUser()
if(!user){
    return null
}
const coaches: CoachProps[] = await getAllCoachbyUserId(user?.id)
  return (
    <Card className="w-[600px]">
    <CardHeader>
        <p className="text-2xl font-semibold text-center">
            My Coaches
        </p>
    </CardHeader>
    <CardContent >
    <div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Expertise</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {coaches.map((coach)=>(
                <TableRow key={coach.coachid}>
                    <TableCell>{coach.name}</TableCell>
                    <TableCell>{coach.expertise[0]}</TableCell>
                    <TableCell><Link href={`/coach/${coach.coachid}`}>View Coach</Link></TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    </div>
    </CardContent>
    </Card>
  )
}

export default CoachDisplay