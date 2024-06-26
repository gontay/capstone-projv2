import { Prisma, RequestStatus } from "@prisma/client"

export interface CoachProps{
    coachid: string,
    name: string,
    rate: number,
    introduction: string,
    expertise: string[],
    image: string,
}

export interface UserProps{
    userId: string,
    name: string,
    bio: string,
    image: string,
}


export interface RequestProps{
    id: string
    coachId: string,
    requestorId: string,
    requestorName: string,
    message: string,
    requestStatus: RequestStatus
}

export interface clientProps{
    id: string,
    clientId: string,
    name: string,
    image: string,
    bio: string,
}

export interface notebookProps{
    id: string,
    coachId: string,
    clientId: string,
    editorState: string,
}

export interface entryProps{
    id: string,
    userId: string,
    title: string,
    content: string,
    dateTimeCreated: Date,
    privacy: boolean,
}

export interface ratingProps{
    id: string,
    authorId: string,
    coachId: string
    rating: number,
    review: string,
}

export interface ClientRequestProps{
    id: string,
    coachId: string,
    requestorId: string,
    coachName: string,
    rejectionReason? : string,
    requestStatus: RequestStatus
}