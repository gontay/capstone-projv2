import UserProfile from "@/components/profile/user-profile";
import { getUserProfile } from "@/lib/utils";


const UserPage = async({params}:any) => {
  const userProfile = await getUserProfile(params.id);
  // const journal = await getJournals(params.id);
  return (
    <div>
    <UserProfile user={userProfile}/>
      <div>
        JOURNAL DISPLAY
      </div> 
    </div>
  )
}

export default UserPage