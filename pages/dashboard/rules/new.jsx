/* globals fetch */
import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Button from '~/components/button'
import Input from '~/components/input'
import Textarea from '~/components/input/textarea'
import Navbar from '~/components/navbar'
import PageHeader from '~/components/page/header'
import Section from '~/components/section'
import Wrapper from '~/components/wrapper'

const Page = () => {
  const { register, handleSubmit, watch, setValue } = useForm()
  const suite = watch(['regexp', 'sample'])

  const router = useRouter()

  const onSubmit = async data => {
    await fetch('/api/rules', {
      method: 'POST',
      body: JSON.stringify(data)
    })

    router.replace('/dashboard/rules')
  }

  React.useEffect(() => {
    if (suite.regexp && suite.sample) {
      try {
        setValue(
          'output',
          (new RegExp(suite.regexp, 'gm')).test(suite.sample) ? 'Fails' : 'Passes',
          false
        )
      } catch (e) {}
    }
  }, [suite])

  return (
    <>
      <Navbar />
      <Wrapper>
        <Section>
          <PageHeader>
            Add rule
          </PageHeader>
        </Section>
        <form
          className='grid grid-cols-1 md:grid-cols-2 gap-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='col-span-full'>
            <Input
              ref={register({ required: true })}
              label='Name'
              name='name'
              required
            />
          </div>
          <Input
            ref={register({ required: true })}
            label='Regular expression'
            name='regexp'
            required
          />
          <div />
          <div className='col-span-full'>
            <Textarea
              ref={register}
              label='Test sample'
              name='sample'
            />
          </div>
          <div className='col-span-full'>
            <Textarea
              ref={register}
              label='Output'
              name='output'
              disabled
            />
          </div>
          <div className='flex flex-row justify-end col-span-full'>
            <Button>
              Save
            </Button>
          </div>
        </form>
      </Wrapper>
    </>
  )
}

export default Page
