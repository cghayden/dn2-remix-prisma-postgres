import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getStudioConfig, requireStudioUserId } from '~/models/studio.server'
import ConfigItemList from '../components/studios/ConfigItemList'
import StringArrayTable from '../components/studios/StringArrayTable'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireStudioUserId(request)
  const config = await getStudioConfig(userId)

  if (!config) throw new Error('error loading config values')

  return json({
    ageLevels: config.ageLevels,
    skillLevels: config.skillLevels,
    stylesOfDance: config.stylesOfDance,
  })
}

export default function StudioConfigIndex() {
  const { ageLevels, skillLevels, stylesOfDance } =
    useLoaderData<typeof loader>()
  return (
    <>
      {/* editable age levels ui */}
      {/* <ConfigItemList itemType='ageLevel' page='Age Levels' data={ageLevels} /> */}
      {/* editable skill levels ui */}
      {/* <ConfigItemList
        itemType='skillLevel'
        page='Skill Levels'
        data={skillLevels}
      /> */}
      {/* styles fo dance list */}
      <StringArrayTable
        itemType='styleOfDance'
        page='Styles of Dance'
        data={stylesOfDance}
      />
    </>
  )
}
