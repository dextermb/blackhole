import { useRouter } from 'next/router'

import ArrowLeft from 'heroicons/solid/arrow-narrow-left.svg'

import Link from '~/components/link'
import HoverMove from '~/components/hover/move'

const Page = () => {
  const router = useRouter()
  const { error = '' } = router.query

  return (
    <>
      <div className='h-screen flex flex-col justify-center items-center'>
        <h1 className='font-bold text-2xl leading-none'>
          Error
        </h1>
        <p className='text-xl mb-4'>
          {error.split(/([A-Z][a-z]+)/).join(' ')}
        </p>
        <Link href='/'>
          <HoverMove move={-1}>
            <ArrowLeft className='w-4 h-4 opacity-50' />
          </HoverMove>
          <span>Home</span>
        </Link>
      </div>
    </>
  )
}

export default Page
