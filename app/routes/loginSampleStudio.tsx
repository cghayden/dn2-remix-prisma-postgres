import { redirect, type ActionFunctionArgs } from '@remix-run/node'
import { verifyLogin } from '~/models/user.server'
import { createUserSession } from '~/session.server'

export const loader = async ({ request }: ActionFunctionArgs) => {
  const user = await verifyLogin('studioa@example.com', 'studioaa')
  console.log('user', user)

  if (!user) {
    return redirect('./welcome')
  }

  return createUserSession({
    redirectTo: `/${user.type.toLowerCase()}`,
    remember: false,
    request,
    userId: user.userId,
    type: user.type,
  })
}
