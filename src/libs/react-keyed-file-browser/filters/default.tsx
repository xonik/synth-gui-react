import React from 'react'
import { FilterRendererProps } from '../types'
import KeyboardAwareInput from '../input/KeyboardAwareInput'

const DefaultFilter: React.FC<FilterRendererProps> = ({ value, updateFilter }) => {
  function handleFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateFilter(event.target.value)
  }

  function showKeyboard(event: React.MouseEvent<HTMLInputElement>) {
    event.currentTarget.value = 'Hello'
  }

  return <KeyboardAwareInput
    heading="Filter"
  />
/*
  return (
    <input
      type="search"
      placeholder="Filter files"
      value={value}
      onClick={showKeyboard}
      onChange={handleFilterChange}
    />
  )
 */
}

export { DefaultFilter }
