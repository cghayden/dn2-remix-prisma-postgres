import { type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getDanceClass } from '~/models/studio.server'
import { PageHeader } from '~/components/styledComponents/PageHeader'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const danceId = params.id
  if (!danceId) {
    throw new Error('no dance Id provided')
  }
  const danceClass = await getDanceClass({ danceId })
  return { danceClass }
}

export default function UpdateDanceClass() {
  const { danceClass } = useLoaderData<typeof loader>()
  console.log('danceClass', danceClass)
  if (!danceClass) {
    return <p>Error: dance class could not be found</p>
  }
  return (
    <>
      <PageHeader
        headerText={danceClass.name}
        editRoute={`/studio/editDanceClass/${danceClass.id}`}
      />
      <div className='p-4'>
        <p className='text-lg font-bold'>
          Performance Name: {danceClass.performanceName}
        </p>
        <p className='text-lg font-bold'>
          Instructor:{' '}
          {danceClass.instructor
            ? `${danceClass.instructor.firstName} ${danceClass.instructor.lastName}`
            : ''}
        </p>
        <div className='py-4 '>
          <h3 className='text-lg font-bold'>Dancers:</h3>
          <ul className='pl-4'>
            {danceClass.enrollments.map((enrollment) => (
              <li key={enrollment.id}>
                <Link to={`/studio/dancer/${enrollment.dancer.id}`}>
                  {enrollment.dancer.firstName} {enrollment.dancer.lastName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='py-4 '>
          <h3 className='text-lg font-bold'>Footwear:</h3>
          <p className='pl-4'>
            <a
              href={danceClass.footwear?.url ?? ''}
              target='_blank'
              rel='noreferrer'
            >
              {danceClass.footwear?.name}
            </a>
          </p>
        </div>
        <div className='py-4 '>
          <h3 className='text-lg font-bold'>Tights:</h3>
          <p className='pl-4'>
            <a
              href={danceClass.tights?.url ?? ''}
              target='_blank'
              rel='noreferrer'
            >
              {danceClass.tights?.name}
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
