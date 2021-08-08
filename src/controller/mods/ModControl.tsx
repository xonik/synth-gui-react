import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiTargetGroup } from '../../synthcore/modules/mods/modsReducer'
import { digitalModSources, modTarget } from '../../synthcore/modules/mods/utils'
import './ModControl.scss'

interface DraggableElementProps {
    offsetX?: number
    offsetY?: number
    onMouseDown: (x: number, y: number, dragX: boolean, dragY: boolean) => void
    onMouseMove: (x: number, y: number) => void
    containerWidth?: number
    containerHeight?: number
}

const SourceLabels = ({ onMouseDown, onMouseMove, offsetX }: DraggableElementProps) => {

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
             style={{ left: offsetX || 0 }}
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

const TargetLabels = ({ onMouseDown, onMouseMove, offsetY }: DraggableElementProps) => {
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
             style={{ top: offsetY || 0 }}
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
    ({ onMouseDown, onMouseMove, offsetX, offsetY },
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
                     top: offsetY || 0,
                     left: offsetX || 0
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

const ModControl = () => {

    const [prevOffsetX, setPrevOffsetX] = useState(0)
    const [prevOffsetY, setPrevOffsetY] = useState(0)
    const [offsetX, setOffsetX] = useState(0)
    const [offsetY, setOffsetY] = useState(0)
    const [initialX, setInitialX] = useState(0)
    const [initialY, setInitialY] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [dragX, setDragX] = useState(false)
    const [dragY, setDragY] = useState(false)

    const onMouseDown = useCallback((x: number, y: number, dragX: boolean, dragY: boolean) => {
        setInitialX(x)
        setInitialY(y)
        setDragX(dragX)
        setDragY(dragY)
        setIsDragging(true)
    }, [])

    const onMouseUp = useCallback(() => {
        if (isDragging) {
            setIsDragging(false)
            setPrevOffsetX(offsetX)
            setPrevOffsetY(offsetY)
        }
    }, [isDragging, setIsDragging, offsetX, offsetY])

    const [tableHeight, setTableHeight] = useState<number>(1)
    const [tableWidth, setTableWidth] = useState<number>(1)
    const tableRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (tableRef.current) {
            setTableHeight(tableRef.current.clientHeight)
            setTableWidth(tableRef.current.clientWidth)
        }
    }, [])

    const [containerHeight, setContainerHeight] = useState<number>(1)
    const [containerWidth, setContainerWidth] = useState<number>(1)
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (containerRef.current) {
            setContainerHeight(containerRef.current.clientHeight)
            setContainerWidth(containerRef.current.clientWidth)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('mouseup', onMouseUp)

        return () => {
            window.removeEventListener('mouseup', onMouseUp)
        }
    }, [onMouseUp])

    console.log({
        tableHeight,
        tableWidth,
        containerHeight,
        containerWidth
    })

    const onDrag = useCallback((x: number, y: number) => {
        if (!isDragging) {
            return
        }
        if (dragX) {
            const newOffsetX = x - initialX + prevOffsetX
            if (newOffsetX < 0) {
                setOffsetX(x - initialX + prevOffsetX)
            } else {
                setOffsetX(0)
            }
        }
        if (dragY) {
            const newOffsetY = y - initialY + prevOffsetY
            if (newOffsetY < 0) {
                setOffsetY(newOffsetY)
            } else {
                setOffsetY(0)
            }
        }
    }, [isDragging, dragX, dragY, initialX, initialY, prevOffsetX, prevOffsetY])

    return (
        <div className="mod-ctrl">
            <div className="mod-ctrl__header">
                <div className="mod-ctrl__header__corner">{'\u00A0'}sdf</div>
                <div className="mod-ctrl__header__sources-container">
                    <SourceLabels
                        offsetX={offsetX}
                        onMouseMove={onDrag}
                        onMouseDown={onMouseDown}
                    />
                </div>
            </div>
            <div className="mod-ctrl__content">
                <div className="mod-ctrl__content__targets-container">
                    <TargetLabels
                        offsetY={offsetY}
                        onMouseMove={onDrag}
                        onMouseDown={onMouseDown}
                    />
                </div>
                <div className="mod-ctrl__content__amounts-container" ref={containerRef}>
                    <AmountsTable
                        ref={tableRef}
                        offsetX={offsetX}
                        offsetY={offsetY}
                        onMouseMove={onDrag}
                        onMouseDown={onMouseDown}
                    />
                </div>
            </div>
        </div>
    )
}

export default ModControl