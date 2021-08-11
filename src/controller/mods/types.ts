import { Point } from '../../utils/types'

export interface DraggableElementProps {
    onMouseDown: (x: number, y: number, dragX: boolean, dragY: boolean) => void
    onMouseMove: (x: number, y: number) => void
}
