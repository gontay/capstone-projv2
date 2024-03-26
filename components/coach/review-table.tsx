import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { currentUser } from '@/lib/auth';
import { ratingProps } from '@/types';
import { getRatings } from '@/lib/utils';

const ReviewTable = async() => {
    const session = await currentUser();
    if(!session?.coach){
      return <>something went wrong</>
    }
    const ratings: ratingProps[] = await getRatings(session.coach.id)
    if(ratings.length === 0){
        return <div>
        <Card className="w-[600px] bg-slate-100 shadow-lg rounded-2xl">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    What my clients are saying
                </p>
            </CardHeader>
        <CardContent className='text-center'>
            No reviews yet
        </CardContent>
        </Card>
        </div>
    }
  return (
    <Card className="w-[600px] bg-slate-100 shadow-lg rounded-2xl">
    <CardHeader>
        <p className="text-2xl font-semibold">
            What my clients are saying
        </p>
    </CardHeader>
    <CardContent>
    <Table>
        <TableBody>
            {ratings.map((rating)=>(
                <TableRow key={rating.id}>
                    <TableCell className='text-left'>{rating.review}</TableCell>
                    <TableCell className='text-left'>{rating.rating}/5</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    </CardContent>
    </Card>
  )
}

export default ReviewTable