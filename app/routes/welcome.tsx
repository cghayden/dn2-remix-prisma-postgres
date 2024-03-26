import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { useState } from 'react'
import stageLights from '../stageLights.png'
// import { useOptionalUser } from '~/utils'

export const meta: MetaFunction = () => [{ title: 'Dancer Notes' }]

export default function Welcome() {
  const [showUserTypeChoice, toggleShowUserTypeChoice] = useState(false)
  // const user = useOptionalUser()
  return (
    <main>
      <div className='h-screen w-screen'>
        <div className='absolute inset-0'>
          <img
            className='h-full w-full object-cover'
            src={stageLights}
            alt='stage lights'
          />
          <div className='absolute inset-0 bg-[color:rgba(27,167,254,0.4)] mix-blend-multiply' />
        </div>
        <div className='text-gray-50 fixed bottom-20 left-2/4 -translate-x-2/4'>
          <a href='loginSampleStudio'>Login To Sample Studio</a>
        </div>
        <div className='grid place-items-center h-full'>
          <div className='relative'>
            <h1 className=' text-center text-5xl font-extrabold tracking-tight sm:text-6xl'>
              <span className='block uppercase text-gray-300 drop-shadow-md'>
                Dancer Notes
              </span>
            </h1>
            <div className='mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center'>
              <div className='space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0'>
                {showUserTypeChoice ? (
                  <>
                    <Link
                      to='/parentJoin'
                      className='flex items-center justify-center rounded-md border border-transparent bg-gray-200 px-4 py-3 text-base font-medium text-gray-800 shadow-sm hover:bg-blue-50 sm:px-8'
                    >
                      Parent Signup
                    </Link>
                    <Link
                      to='/studioJoin'
                      className='flex items-center justify-center rounded-md border border-transparent bg-gray-200 px-4 py-3 text-base font-medium text-gray-700-700 shadow-sm hover:bg-blue-50 sm:px-8'
                    >
                      Studio Signup
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => toggleShowUserTypeChoice(true)}
                      className='flex items-center justify-center rounded-md border w-full border-transparent bg-gray-200 px-4 py-3 font-medium text-gray-700 shadow-sm hover:bg-blue-50 sm:px-8 text-xl'
                    >
                      Sign up
                    </button>
                    <Link
                      to='/login'
                      className=' flex items-center justify-center bg-transparent px-4 py-3 rounded-md  font-medium text-gray-200 text-xl'
                    >
                      Log In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          d
        </div>
      </div>
    </main>
  )
}

// <Link
//                     to={`/${user.type}`}
//                     className='flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8'
//                   >
//                     View Notes for {user.email}
//                   </Link>
