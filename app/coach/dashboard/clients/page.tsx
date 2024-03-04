import ClientDisplay from '@/components/coach/client-display'
import ClientNotebookDisplay from '@/components/coach/client-notebook-display';
import { currentUser } from '@/lib/auth';
import React from 'react'

const ClientPage = async() => {
    const user = await currentUser();
  return (
    <div> 
        {/* <ClientDisplay coachId={user?.coach.id||''}/> */}
        <ClientNotebookDisplay coachId={user?.coach.id||''}/>
    </div>
  )
}

export default ClientPage