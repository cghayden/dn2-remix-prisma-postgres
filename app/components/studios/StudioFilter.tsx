import type { Filters } from '~/routes/studio.danceClasses'

type FilterCategories = {
  ageLevels: { id: string; name: string }[]
  tights: { id: string; name: string }[]
  stylesOfDance: string[]
}

export default function StudioFilter({
  categories,
  filters,
  setFilters,
}: {
  categories: FilterCategories
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}) {
  const handleFilterChange = (
    category: keyof Filters,
    name: string,
    isChecked: boolean
  ) => {
    const newFilterValues = isChecked
      ? [...filters[category], name] // Add id
      : filters[category].filter((value) => value !== name) // Remove id

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
                    value={ageLevel.name}
                    checked={filters.ageLevel?.includes(ageLevel.name)}
                    onChange={(e) =>
                      handleFilterChange(
                        'ageLevel',
                        ageLevel.name,
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
          <legend className='pl-4 pb-4'>Style</legend>
          <ul>
            {categories.stylesOfDance.map((style) => (
              <li key={style}>
                <label>
                  <input
                    name={style}
                    type='checkbox'
                    value={style}
                    checked={filters.stylesOfDance?.includes(style)}
                    onChange={(e) =>
                      handleFilterChange(
                        'stylesOfDance',
                        style,
                        e.target.checked
                      )
                    }
                  />
                  {style}
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
                    value={tightsItem.name}
                    checked={filters.tights?.includes(tightsItem.name)}
                    onChange={(e) =>
                      handleFilterChange(
                        'tights',
                        tightsItem.name,
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
