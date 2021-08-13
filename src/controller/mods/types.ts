import React from 'react'

export interface DraggableElementProps {
    onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void
    onMouseMove?: (event: React.MouseEvent<HTMLDivElement>) => void
}
