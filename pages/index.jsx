import { providers, useSession, signIn, signOut } from 'next-auth/client'

import Key from 'heroicons/solid/key.svg'
import Lock from 'heroicons/solid/lock-closed.svg'
import ArrowRight from 'heroicons/solid/arrow-narrow-right.svg'

import HoverScale from '~/components/hover/scale'
import HoverMove from '~/components/hover/move'

import Button from '~/components/button'
import Link from '~/components/link'

const Page = ({ provider }) => {
  const [session, loading] = useSession()

  return (
    <>
      <div className='h-screen p-8 flex flex-col justify-center items-start'>
        <h1 className='font-bold text-2xl leading-none'>
          Blackhole
        </h1>
        <p className='md:w-1/2 lg:w-1/4 mb-4'>
          A mailserver that collects outbound emails and stores them.
          Add filters and rules to control what data gets collected.
        </p>
        {(loading || !session) && (
          <Button
            onClick={() => signIn(provider.id)}
            wide
          >
            <HoverScale>
              <Key className='w-4 h-4 opacity-50' />
            </HoverScale>
            <span>Sign in with {provider.name}</span>
          </Button>
        )}
        {!loading && session && (
          <div className='flex flex-col-reverse sm:flex-row justify-start items-start sm:items-center space-y-4 sm:space-x-4 sm:space-y-0'>
            <Button onClick={() => signOut(provider.id)}>
              <HoverScale>
                <Lock className='w-4 h-4 opacity-50' />
              </HoverScale>
              <span>Sign out</span>
            </Button>
            <Link href='/dashboard'>
              <span>Continue as <b>{session.user.name}</b></span>
              <HoverMove>
                <ArrowRight className='w-4 h-4 opacity-50' />
              </HoverMove>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

Page.getInitialProps = async ctx => {
  const obj = await providers(ctx)
  const key = Object.keys(obj)[0]

  return {
    provider: obj[key]
  }
}

export default Page
