'use client'
import OnboardForm from '@/components/coach/onboard-form'
import { useCurrentCoach } from '@/hooks/use-current-coach'
import { useCurrentRole } from '@/hooks/use-current-role'

import React from 'react'

const DetailsPage = () => {
    const coach  = useCurrentCoach();
  return (
    <div>
        {JSON.stringify(coach)}
    </div>
  )
}

export default DetailsPage