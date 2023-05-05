import React from 'react'

import { TableRowContainer, TableHeaderContainer } from './style'
import { HeaderRendererProps } from '../types'

const RawTableHeader: React.FC<HeaderRendererProps> = () => {
  return (
    <TableRowContainer isDragOver={false} selected={true}>
      <TableHeaderContainer>Files</TableHeaderContainer>
      <TableHeaderContainer type="size">Size</TableHeaderContainer>
      <TableHeaderContainer type="modified">
        Last Modified
      </TableHeaderContainer>
    </TableRowContainer>
  )
}

export { RawTableHeader }
