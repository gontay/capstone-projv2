
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import RequestForm from '@/components/coach/request-form';

interface RequestButtonProps {
  children: React.ReactNode;
  //mode?: "modal" | "redirect",
  asChild? :  boolean;
  action? : "CoachRequest" | "",
  coachId : string
}

const CoachRequestButton = ({
  children,
  //mode = "redirect",
  asChild,
  action = "CoachRequest",
  coachId,
}:RequestButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>
        {children}
      </DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <RequestForm coachId={coachId}/>
      </DialogContent>
    </Dialog>
  )
}

export default CoachRequestButton