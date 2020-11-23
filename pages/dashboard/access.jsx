/* globals fetch */
import swr, { trigger } from 'swr'
import { useForm } from 'react-hook-form'

import Navbar from '~/components/navbar'
import Wrapper from '~/components/wrapper'
import Section from '~/components/section'
import PageHeader from '~/components/page/header'
import Button from '~/components/button'
import Input from '~/components/input'

const Page = () => {
  const { data: items } = swr('/api/access')
  const { register, handleSubmit, setValue } = useForm()

  const onAdd = async data => {
    await fetch('/api/access', {
      method: 'POST',
      body: JSON.stringify(data)
    })

    trigger('/api/access')
    setValue('email', '')
  }

  const onRemove = async id => {
    await fetch('/api/access', {
      method: 'DELETE',
      body: JSON.stringify({ id })
    })

    trigger('/api/access')
  }

  return (
    <>
      <Navbar />
      <Wrapper>
        <Section>
          <PageHeader>
            Access
          </PageHeader>
          <p>Control which users will be able to sign in and view and configure emails.</p>
        </Section>
        <Section>
          <table className='w-full table-auto border-collapse'>
            <thead className='text-sm capitalize'>
              <tr className='bg-gray-100 text-left'>
                <th className='p-2'>
                  Email
                </th>
                <th className='p-2'>
                  Created by
                </th>
                <th className='p-2'>
                  Created at
                </th>
                <th />
              </tr>
            </thead>
            {items && (
              <tbody>
                {items.length > 0 && items.map(item => (
                  <tr key={item._id}>
                    <td className='p-2'>
                      {item.email}
                    </td>
                    <td className='p-2'>
                      {item.created_by}
                    </td>
                    <td className='p-2'>
                      {item.created_at}
                    </td>
                    <td className='p-2'>
                      <div className='flex justify-end'>
                        <Button
                          size='sm'
                          onClick={() => onRemove(item._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className='p-2'>
                    <Input
                      ref={register({ required: true })}
                      name='email'
                      className='w-64'
                      placeholder='Email Address'
                      size='sm'
                    />
                  </td>
                  <td />
                  <td />
                  <td className='p-2'>
                    <div className='flex justify-end'>
                      <Button
                        size='sm'
                        onClick={handleSubmit(onAdd)}
                      >
                        Add
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
            {!items && (
              <tbody>
                <tr>
                  <td colspan={4}>
                    <div className='flex justify-center items-center px-4 py-12'>
                      Loading...
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </Section>
      </Wrapper>
    </>
  )
}

export default Page
