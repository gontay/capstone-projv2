import Image from 'next/image'
import Hero from '@/components/Hero';
import CoachCard from '@/components/coach-card';
import { CoachProps } from '@/types';
import { getCoaches } from '@/lib/utils';

export default async function Home() {
  const allCoaches: CoachProps[] = await getCoaches()
  return (
    <main>
      <Hero/>
      <div className="daisy-divider" id='discover'>
        <h1 className='text-4x1 font-semibold'>Find the right coach for your goals</h1>
      </div>
        <section>
        <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14'>
            {allCoaches.map((coach, index)=>(
              <CoachCard key={index} coach={coach}/>
            ))}
            </div>
        </section>
    </main>
  )
}
