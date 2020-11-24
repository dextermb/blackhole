import Link from 'next/link'
import swr from 'swr'

import Navbar from '~/components/navbar'
import Wrapper from '~/components/wrapper'
import Section from '~/components/section'
import PageHeader from '~/components/page/header'
import Button from '~/components/button'

const Page = () => {
  const { data: items } = swr('/api/rules')

  return (
    <>
      <Navbar />
      <Wrapper>
        <Section>
          <div className='flex flex-row justify-between space-x-4'>
            <div>
              <PageHeader>
                Rules
              </PageHeader>
              <p>Control which emails get stored.</p>
            </div>
            <div>
              <Link href='/dashboard/rules/new'>
                <Button>Add</Button>
              </Link>
            </div>
          </div>
        </Section>
        <Section>
          <table className='w-full table-auto border-collapse'>
            <thead className='text-sm capitalize'>
              <tr className='bg-gray-100 text-left'>
                <th className='p-2'>
                  Name
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
                      {item.name}
                    </td>
                    <td className='p-2'>
                      {item.created_by}
                    </td>
                    <td className='p-2'>
                      {item.created_at}
                    </td>
                    <td className='p-2'>
                      <div className='flex justify-end'>
                        <Link href='/dashboard/rules/[id]' as={`/dashboard/rules/${item._id}`}>
                          <Button size='sm'>
                            View
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {!items.length && (
                  <td colSpan={4}>
                    <div className='flex justify-center items-center px-4 py-12'>
                      No rules
                    </div>
                  </td>
                )}
              </tbody>
            )}
            {!items && (
              <tbody>
                <tr>
                  <td colSpan={4}>
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
