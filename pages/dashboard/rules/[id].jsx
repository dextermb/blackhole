/* globals fetch */
import React from 'react'
import swr from 'swr'
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
  const { id } = router.query
  const { data } = swr(id ? `/api/rules/${id}` : null)

  const onSubmit = async data => {
    await fetch(`/api/rules/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })

    router.replace('/dashboard/rules')
  }

  const onRemove = async () => {
    await fetch(`/api/rules/${id}`, {
      method: 'DELETE'
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

  React.useEffect(() => {
    if (data) {
      Object.entries(data).forEach(([field, value]) => setValue(field, value))
    }
  }, [data])

  return (
    <>
      <Navbar />
      <Wrapper>
        <Section>
          <PageHeader>
            Update rule
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
          <div className='flex flex-row justify-between space-x-4 col-span-full'>
            <Button
              type='button'
              theme='danger'
              onClick={() => onRemove()}
            >
              Delete
            </Button>
            <Button type='submit'>
              Save
            </Button>
          </div>
        </form>
      </Wrapper>
    </>
  )
}

export default Page
