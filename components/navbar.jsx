import React from 'react'
import { useSession } from 'next-auth/client'

import image from '~/utilities/web/image-hash'

import Link from '~/components/link'

const Navbar = () => {
  const [session, loading] = useSession()
  const [gradient, setGradient] = React.useState([])

  React.useEffect(() => {
    if (session && !session.user.image) {
      setGradient(image(session?.user.name))
    }
  }, [session])

  return (
    <div className='px-8 pt-4 pb-8'>
      <div className='flex flex-row justify-between items-center space-x-4'>
        <div className='flex flex-row items-center space-x-4'>
          <Link href='/'>
            Blackhole
          </Link>
          <Link href='/dashboard/access'>
            Access
          </Link>
          <Link href='/dashboard/filters'>
            Filters
          </Link>
          <Link href='/dashboard/rules'>
            Rules
          </Link>
        </div>
        {(!loading || session) && (
          <div className='flex flex-row items-center space-x-4'>
            <Link href='/account'>
              {session.user.image && (
                <img
                  className='w-6 h-6 bg-gray-100 rounded-full'
                  src={session.user.image}
                />
              )}
              {!session.user.image && (
                <span
                  className='w-6 h-6 rounded-full'
                  style={{ background: `linear-gradient(45deg, ${gradient[0]}, ${gradient[1]})` }}
                />
              )}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
