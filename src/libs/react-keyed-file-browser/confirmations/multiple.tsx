import React from 'react'
import { ConfirmMultipleDeletionRendererProps } from '../types'

const MultipleConfirmation: React.FC<ConfirmMultipleDeletionRendererProps> = ({ handleDeleteSubmit }) => {
  return (
    <button className="deleting" onClick={handleDeleteSubmit}>
      Confirm Deletion
    </button>
  )
}

export { MultipleConfirmation }
