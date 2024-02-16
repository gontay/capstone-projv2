import UserProfile from "@/components/profile/user-profile";
import { getUserProfile } from "@/lib/utils";


const UserPage = async({params}:any) => {
  const userProfile = await getUserProfile(params.id);

  return (
    <div>
    <UserProfile user={userProfile}/>
    </div>
  )
}

export default UserPage