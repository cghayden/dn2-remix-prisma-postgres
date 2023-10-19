// app/routes/index.ts

import { redirect } from '@remix-run/node'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { requireUser } from '~/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireUser(request)
  // no user redirects to welcome
  console.log('user from _index', user)

  return redirect(`/${user.type.toLowerCase()}`)
}
