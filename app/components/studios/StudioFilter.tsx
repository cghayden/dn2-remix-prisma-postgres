import type { Filter } from '~/routes/studio.danceClasses'

type FilterCategories = {
  ageLevels: { id: string; name: string }[]
  tights: { id: string; name: string }[]
}

export default function StudioFilter({
  categories,
  filters,
  setFilters,
}: {
  categories: FilterCategories
  filters: Filter
  setFilters: React.Dispatch<React.SetStateAction<Filter>>
}) {
  const handleFilterChange = (
    category: keyof Filter,
    id: string,
    isChecked: boolean
  ) => {
    const newFilterValues = isChecked
      ? [...filters[category], id] // Add id
      : filters[category].filter((value) => value !== id) // Remove id

    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: newFilterValues,
    }))
  }

  return (
    <>
      <h3 className='font-bold text-lg text-center py-4'>Filters</h3>
      <div>
        <div className='my-6'>
          <legend className='pl-4 pb-4'>Age Levels</legend>
          <ul className='pl-6'>
            {categories.ageLevels.map((ageLevel) => (
              <li key={ageLevel.id}>
                <label>
                  <input
                    name={ageLevel.name}
                    type='checkbox'
                    value={ageLevel.id}
                    checked={filters.ageLevel?.includes(ageLevel.id)}
                    onChange={(e) =>
                      handleFilterChange(
                        'ageLevel',
                        ageLevel.id,
                        e.target.checked
                      )
                    }
                  />
                  {ageLevel.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className='my-6'>
          <legend className='pl-4 pb-4'>Tights</legend>
          <ul>
            {categories.tights.map((tightsItem) => (
              <li key={tightsItem.id}>
                <label>
                  <input
                    name={tightsItem.name}
                    type='checkbox'
                    value={tightsItem.id}
                    checked={filters.tights?.includes(tightsItem.id)}
                    onChange={(e) =>
                      handleFilterChange(
                        'tights',
                        tightsItem.id,
                        e.target.checked
                      )
                    }
                  />
                  {tightsItem.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
