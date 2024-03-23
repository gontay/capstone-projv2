import Entrydisplay from "@/components/journal/entry-display";
import UserProfile from "@/components/profile/user-profile";
import { getUserProfile } from "@/lib/utils";


const UserPage = async({params}:any) => {
  const userProfile = await getUserProfile(params.id);
  // const journal = await getJournals(params.id);
  return (
    <div>
    <UserProfile user={userProfile}/>
      <div>
        <Entrydisplay type="public" userId={params.id}/>
      </div> 
    </div>
  )
}

export default UserPage