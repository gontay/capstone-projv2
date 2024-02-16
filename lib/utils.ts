import { getUserById } from "@/data/auth/user";
import { getAllCoach, getCoachById, getCoachProfileByCoachId } from "@/data/coach/coach"
import { getClientsByCoachId, getNotebookByClientId, getNotebookByCoachId } from "@/data/notebook/notebook";
import { getRequestByCoachId } from "@/data/requests/request";
import { CoachProps, RequestProps, UserProps, clientProps } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getCoaches(){
  const someList = [];
  const allCoaches = await getAllCoach()

  for(var r in allCoaches){

    var coach: CoachProps = 
    {
      coachid: allCoaches[r].Coach?.id,
      image: allCoaches[r].image,
      name: allCoaches[r].name,
      rate: allCoaches[r].Coach?.rate,
      introduction: allCoaches[r].Coach?.introduction,
      expertise: allCoaches[r].Coach?.areaOfExpertise
    }
    someList.push(coach)
  }
  return someList;
}

export async function getCoach(id:string){
  const coach = getCoachById(id);
  return coach
}

export async function getCoachProfile(id:string){
  const coach = await getCoachProfileByCoachId(id);
  var coachProfile: CoachProps = 
  {
    coachid: coach.id,
      image: coach.user.image,      
      name: coach.user.name,     
      rate: coach.rate,
      introduction: coach?.introduction ,
      expertise: coach.areaOfExpertise
  }
  console.log("coachProfile",coachProfile)
  return coachProfile
}

export async function getUserProfile(id:string){
  const user = await getUserById(id);
  var userProfile: UserProps = {
    userId: user?.id,
    name: user?.name,
    bio: user?.bio,
    image: user?.image
  }
  return userProfile;
}

export async function getRequests(id:string){
  const requestList = [];
  const requests =  await getRequestByCoachId(id);
  for (var r in requests){
    var coachRequest: RequestProps = 
    {
      id: requests[r].id,
      coachId : requests[r].coachId,
      requestorId: requests[r].requestorId,
      requestorName: requests[r].requestor.name,
      message: requests[r].message,
    }
    requestList.push(coachRequest)
  }
  console.log(requestList);
  return requestList;
}

export async function getCoachNotebooks(id:string){
  const Notebooks = await getNotebookByCoachId(id);
  return Notebooks;
}

export async function getClientNotebooks(id:string){
  
  const Notebooks = await getNotebookByClientId(id);

  return Notebooks;
}


export async function getClients(id:string){
  const clientList= [];
  const clients = await getClientsByCoachId(id);
  for(var c in clients){
    var client: clientProps = {
      id: clients[c].id,
      clientId: clients[c].id,
      name: clients[c].client.name,
      image: clients[c].client.image,
      bio: clients[c].client.bio
    }
    clientList.push(client)
    console.log(client)
  }
  return clientList;
}