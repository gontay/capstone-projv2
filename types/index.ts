export interface CoachProps{
    coachid: string,
    name: string,
    rate: number,
    introduction: string,
    expertise: string[],
    image: string,
    // rating?: number,
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
}

export interface clientProps{
    id: string,
    clientId: string,
    name: string,
    image: string,
    bio: string,
}