import React from 'react'
import { FilterRendererProps } from '../types'
import KeyboardAwareInput from '../input/KeyboardAwareInput'

const DefaultFilter: React.FC<FilterRendererProps> = ({ value, updateFilter }) => {
    function handleFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
        updateFilter(event.target.value)
    }

    return <KeyboardAwareInput
        type="search"
        placeholder="Filter files"
        heading="Filter"
        value={value}
        onChange={handleFilterChange}
    />
}

export { DefaultFilter }
