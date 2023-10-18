import { redirect, type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getFullStudio } from '~/models/studio.server'
import { getUserId } from '~/session.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request)
  if (!userId) {
    return redirect('/')
  }
  const studio = await getFullStudio(userId)
  return json({ studio })
}

export default function StudioIndex() {
  const { studio } = useLoaderData<typeof loader>()
  console.log('studio', studio)
  return (
    <div>
      <h1 className='text-center text-lg p-4'>Studio Index</h1>
      <div className='flex justify-center'>
        <ul className='p-4'>
          {studio?.danceClasses.map((danceClass) => (
            <li key={danceClass.id} className='py-2'>
              {danceClass.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
