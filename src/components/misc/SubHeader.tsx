import classNames from 'classnames'
import { BORDER_MARGIN } from '@/constants'
import './SubHeader.scss'

type PositionAlign = 'center' | 'left' | 'right'

interface Props {
    x: number
    y: number
    width: number
    align?: PositionAlign
    labelPosition?: PositionAlign | number
    label?: string
    labelWidth?: number
    padding?: 'left' | 'right' | 'both'
    className?: string
    labelBackgroundOn?: boolean
}

const getCenter = (x: number, _y: number, width: number, align: PositionAlign) => {
    switch (align) {
        case 'center':
            return x
        case 'left':
            return x + width / 2
        case 'right':
            return x - width / 2
    }
}

const SubHeader = ({
    x,
    y,
    width,
    align = 'left',
    label,
    labelWidth,
    labelPosition: inputLabelPos = 'center',
    padding = 'both',
    className,
    labelBackgroundOn = true,
}: Props) => {
    const center = getCenter(x, y, width, align)

    const paddingLeft = padding !== 'right' ? BORDER_MARGIN : 0
    const paddingRight = padding !== 'left' ? BORDER_MARGIN : 0

    let labelPosition: PositionAlign
    let labelCenter: number

    if (isNumeric(inputLabelPos)) {
        labelPosition = 'center'
        labelCenter = inputLabelPos
    } else {
        labelPosition = inputLabelPos
        labelCenter = center
    }

    return (
        <>
            {labelBackgroundOn && (
                <>
                    <rect
                        x={x + paddingLeft}
                        y={y + BORDER_MARGIN / 2}
                        width={width - paddingLeft - paddingRight}
                        height={1}
                        className={classNames(className, 'subheader-border')}
                    />

                    <polygon
                        points={getLabelBackground(x, y, labelWidth ?? 30, labelCenter, labelPosition)}
                        className={classNames(className, 'subheader-border')}
                    />
                </>
            )}
            {label && (
                <text
                    x={labelPosition === 'center' ? labelCenter : x + 3}
                    y={y + 3.85}
                    className={classNames(className, 'subheader-label')}
                    textAnchor={labelPosition === 'center' ? 'middle' : 'start'}
                    alignmentBaseline="baseline"
                >
                    {label}
                </text>
            )}
        </>
    )
}

const getLabelBackground = (x: number, y: number, labelWidth: number, center: number, labelPosition: PositionAlign) => {
    const height = 3.5
    const offset = 1.5

    const leftOffset = labelPosition === 'left' ? 0 : -offset
    const rightOffset = labelPosition === 'right' ? 0 : offset

    function getLabelPositionMapper() {
        if (labelPosition === 'left') {
            return ([x0, y0]: Array<number>) => [x + BORDER_MARGIN + x0, y + BORDER_MARGIN + y0]
        } else {
            return ([x0, y0]: Array<number>) => [center - labelWidth / 2 + x0, y + BORDER_MARGIN + y0]
        }
    }

    const mapper = getLabelPositionMapper()

    return [
        [leftOffset, 0],
        [labelWidth + rightOffset, 0],
        [labelWidth, height],
        [0, height],
    ]
        .map(mapper)
        .map(([x0, y0]) => `${x0},${y0}`)
        .join(' ')
}

function isNumeric(number: PositionAlign | number): number is number {
    return !Number.isNaN(Number(number))
}

export default SubHeader
