import React from 'react'
import { LockAxis } from '../utils/ScrollSyncNode'

export interface DraggableElementProps {
    onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void
    onMouseMove?: (event: React.MouseEvent<HTMLDivElement>) => void
    lockAxis?: LockAxis
}
