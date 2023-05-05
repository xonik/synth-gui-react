import React from 'react'
import { FilterRendererProps } from '../types'

const DefaultFilter: React.FC<FilterRendererProps> = ({ value, updateFilter }) => {
  function handleFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateFilter(event.target.value)
  }

  return (
    <input
      type="search"
      placeholder="Filter files"
      value={value}
      onChange={handleFilterChange}
    />
  )
}

export { DefaultFilter }
