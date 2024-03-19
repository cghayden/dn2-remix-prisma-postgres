import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireStudioUserId } from '~/models/studio.server'
import { prisma } from '~/db.server'
import StudioFilter from '~/components/studios/StudioFilter'
import { useEffect, useState } from 'react'
import DanceClassListing from '~/components/DanceClassListing'
import { DanceClass } from '@prisma/client'

export type Filter = {
  ageLevel: string[]
  tights: string[]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const studioId = await requireStudioUserId(request)
  const dances = await prisma.danceClass.findMany({
    where: {
      studioId,
    },
  })
  const filterData = await prisma.studio.findUnique({
    where: {
      userId: studioId,
    },
    select: {
      ageLevels: {
        select: {
          id: true,
          name: true,
        },
      },
      tights: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
  return { dances, filterData }
}

export default function DanceClasses() {
  const { dances, filterData } = useLoaderData<typeof loader>()
  console.log('filterData', filterData)

  const [filters, setFilters] = useState<Filter>({ ageLevel: [], tights: [] })

  const [filteredDances, setFilteredDances] = useState<DanceClass[] | null>()

  useEffect(() => {
    const applyFilters = () => {
      let result = dances.filter(
        (dance) =>
          (filters.ageLevel.length === 0 ||
            filters.ageLevel.includes(dance.ageLevelId)) &&
          (filters.tights.length === 0 ||
            (dance.tightsId && filters.tights.includes(dance.tightsId)))
          // && (filters.footwear.length === 0 || filters.footwearId.includes(dance.footwearId))
      )
      setFilteredDances(result)
    }

    applyFilters()
  }, [filters, dances])

  return (
    <div className='flex h-[100vh]'>
      <div className='flex-1'>
        <DanceClassListing
          danceClasses={filteredDances ? filteredDances : dances}
        />
      </div>
      <div className='w-[200px] bg-slate-300 h-full'>
        {filterData && (
          <StudioFilter
            categories={filterData}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </div>
    </div>
  )
}
