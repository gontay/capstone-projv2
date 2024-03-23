

import dynamic from 'next/dynamic';


const Scheduler = dynamic(()=> import('@/components/test/scheduler'), {ssr: false,})

const page = () => {
    return(
        <div>
            <Scheduler/>
        </div>
    )
  
}

export default page