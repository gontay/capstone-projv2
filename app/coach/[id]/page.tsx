import CoachProfile from "@/components/coach/coach-profile";
import { getCoachProfile } from "@/lib/utils";


const CoachPage = async({params}:any) => {
  const coachProfile = await getCoachProfile(params.id);

  return (
    <div>
    <CoachProfile coach={coachProfile}/>
    </div>
  )
}

export default CoachPage