import React, { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiTargetGroup } from '../../synthcore/modules/mods/modsReducer'
import { digitalModSources, modTarget } from '../../synthcore/modules/mods/utils'
import { Point } from '../../utils/types'
import './ModControl.scss'

interface DraggableElementProps {
    offset: Point
    onMouseDown: (x: number, y: number, dragX: boolean, dragY: boolean) => void
    onMouseMove: (x: number, y: number) => void
}

const SourceLabels = ({ onMouseDown, onMouseMove, offset }: DraggableElementProps) => {

    const mouseDownHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        onMouseDown(event.clientX, event.clientY, true, false)
        if (event.preventDefault) {
            event.preventDefault()
        }
    }, [onMouseDown])

    const mouseMoveHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        onMouseMove(event.clientX, event.clientY)
        if (event.preventDefault) {
            event.preventDefault()
        }
    }, [onMouseMove])

    return (
        <div className="mod-ctrl__sources"
             style={{ left: offset.x }}
             onMouseDown={mouseDownHandler}
             onMouseMove={mouseMoveHandler}
        >
            {digitalModSources
                .map((controller, ctrlIndex) => {
                    return <div
                        className="mod-ctrl__source"
                        key={ctrlIndex}>
                        {controller.label}
                    </div>
                })}
        </div>
    )
}

const TargetLabels = ({ onMouseDown, onMouseMove, offset }: DraggableElementProps) => {
    const targetGroupId = useAppSelector(selectGuiTargetGroup)
    const targetGroup = modTarget.targets[targetGroupId]

    const mouseDownHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        onMouseDown(event.clientX, event.clientY, false, true)
        if (event.preventDefault) {
            event.preventDefault()
        }
    }, [onMouseDown])

    const mouseMoveHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        onMouseMove(event.clientX, event.clientY)
        if (event.preventDefault) {
            event.preventDefault()
        }
    }, [onMouseMove])

    return (
        <div className="mod-ctrl__targets"
             style={{ top: offset.y }}
             onMouseDown={mouseDownHandler}
             onMouseMove={mouseMoveHandler}>
            {targetGroup.map((func, funcIndex) => {
                return <div className="mod-ctrl__target" key={funcIndex}>
                    <div className="mod-ctrl__target__label">
                        {modTarget.funcProps[targetGroupId][funcIndex].label}
                    </div>
                    {func.map((controller, ctrlIndex) =>
                        <div
                            className="mod-ctrl__target__label mod-ctrl__target__label--param"
                            key={ctrlIndex}>
                            {controller.label}
                        </div>
                    )}
                </div>
            })}
        </div>
    )
}

const AmountsRow = () => {
    return (
        <div className="mod-ctrl__sources">
            {digitalModSources
                .map((controller, ctrlIndex) => {
                    return <div
                        className="mod-ctrl__amount"
                        key={ctrlIndex}>
                        {controller.label}
                    </div>
                })}
        </div>
    )
}

const AmountsTable = React.forwardRef<HTMLDivElement, DraggableElementProps>(
    ({ onMouseDown, onMouseMove, offset },
     tableRef
    ) => {
        const targetGroupId = useAppSelector(selectGuiTargetGroup)
        const targetGroup = modTarget.targets[targetGroupId]

        const mouseDownHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
            console.log('mouse down')
            onMouseDown(event.clientX, event.clientY, true, true)
            if (event.preventDefault) {
                event.preventDefault()
            }
        }, [onMouseDown])

        const mouseMoveHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
            onMouseMove(event.clientX, event.clientY)
            if (event.preventDefault) {
                event.preventDefault()
            }
        }, [onMouseMove])

        return (
            <div className="mod-ctrl__amounts-table"
                 ref={tableRef}
                 style={{
                     left: offset.x,
                     top: offset.y,
                 }}
                 onMouseDown={mouseDownHandler}
                 onMouseMove={mouseMoveHandler}>
                {targetGroup.map((func, funcIndex) => {
                    return <div className="mod-ctrl__target" key={funcIndex}>
                        <div className="mod-ctrl__amount">
                        </div>
                        {func.map((controller, ctrlIndex) => <AmountsRow/>)}
                    </div>
                })}
            </div>
        )
    }
)

interface Dimension {
    w: number
    h: number
}

const ModControl = () => {

    const [offset, setOffset] = useState<Point>({ x: 0, y: 0 })
    const [prevOffset, setPrevOffset] = useState<Point>({ x: 0, y: 0 })

    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 })
    const [canDrag, setCanDrag] = useState<{ x: boolean, y: boolean }>({ x: false, y: false })

    const [containerSize, setContainerSize] = useState<Dimension>()
    const [cornerSize, setCornerSize] = useState<Dimension>()
    const [amountsTableSize, setAmountsTableSize] = useState<Dimension>()
    const [maxOffset, setMaxOffset] = useState<Point>()

    const calcMaxOffset = useCallback(() => {
        if (containerSize && cornerSize && amountsTableSize) {
            const amountsContainerHeight = containerSize.h - cornerSize.h
            const amountsContainerWidth = containerSize.w - cornerSize.w

            setMaxOffset({
                y: amountsContainerHeight - amountsTableSize.h,
                x: amountsContainerWidth - amountsTableSize.w
            })

        }
    }, [containerSize, cornerSize, amountsTableSize])

    // https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
    const updateAmountsTableSize = useCallback((div: HTMLDivElement) => {
        if (div) {
            setAmountsTableSize({ h: div.clientHeight, w: div.clientWidth })
        }
    }, [])

    const updateContainerSize = useCallback((div: HTMLDivElement) => {
        if (div) {
            setContainerSize({ h: div.clientHeight, w: div.clientWidth })
        }
    }, [])

    const updateCornerSize = useCallback((div: HTMLDivElement) => {
        if (div) {
            setCornerSize({ h: div.clientHeight, w: div.clientWidth })
        }
    }, [])

    const onMouseDown = useCallback((x: number, y: number, dragX: boolean, dragY: boolean) => {
        if (!maxOffset) {
            if (containerSize && cornerSize && amountsTableSize) {
                calcMaxOffset()
            } else {
                return
            }
        }
        setDragStart({ x, y })
        setCanDrag({ x: dragX, y: dragY })
        setIsDragging(true)

    }, [amountsTableSize, cornerSize, containerSize, maxOffset, calcMaxOffset])

    const onMouseUp = useCallback(() => {
        if (isDragging) {
            setIsDragging(false)
            setPrevOffset({x: offset.x, y: offset.y})
        }
    }, [isDragging, setIsDragging, offset])

    useEffect(() => {
        window.addEventListener('mouseup', onMouseUp)
        return () => {
            window.removeEventListener('mouseup', onMouseUp)
        }
    }, [onMouseUp])

    const onDrag = useCallback((x: number, y: number) => {
        if (!isDragging || !maxOffset) {
            return
        }
        let offsetX = prevOffset.x
        let offsetY = prevOffset.y
        if (canDrag.x) {
            const newOffsetX = x - dragStart.x + prevOffset.x
            if (newOffsetX < 0) {
                if (newOffsetX > maxOffset.x) {
                    offsetX = newOffsetX
                } else {
                    offsetX = maxOffset.x
                }
            } else {
                offsetX = 0
            }
        }
        if (canDrag.y) {
            const newOffsetY = y - dragStart.y + prevOffset.y
            if (newOffsetY < 0) {
                if (newOffsetY > maxOffset.y) {
                    offsetY = newOffsetY
                } else {
                    offsetY = maxOffset.y
                }
            } else {
                offsetY = 0
            }
        }
        setOffset({x: offsetX, y: offsetY})
    }, [isDragging, canDrag, dragStart,prevOffset, maxOffset])

    return (
        <div className="mod-ctrl" ref={updateContainerSize}>
            <div className="mod-ctrl__header">
                <div className="mod-ctrl__header__corner" ref={updateCornerSize}/>
                <div className="mod-ctrl__header__sources-container">
                    <SourceLabels
                        offset={offset}
                        onMouseMove={onDrag}
                        onMouseDown={onMouseDown}
                    />
                </div>
            </div>
            <div className="mod-ctrl__content">
                <div className="mod-ctrl__content__targets-container">
                    <TargetLabels
                        offset={offset}
                        onMouseMove={onDrag}
                        onMouseDown={onMouseDown}
                    />
                </div>
                <div className="mod-ctrl__content__amounts-container">
                    <AmountsTable
                        ref={updateAmountsTableSize}
                        offset={offset}
                        onMouseMove={onDrag}
                        onMouseDown={onMouseDown}
                    />
                </div>
            </div>
        </div>
    )
}

export default ModControl