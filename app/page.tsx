import Image from 'next/image'
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main>
      <Hero/>
      <div className="daisy-divider" id='discover'>
        <h1 className='text-4x1 font-semibold'>Find the right coach for your goals</h1>
      </div>
    </main>
  )
}
