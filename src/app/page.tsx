'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const HomeRedirect = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirect to '/home' when the component mounts
    router.push('/home')
  }, [router])

  return null // You don't need to render anything on the main page
}

export default HomeRedirect
