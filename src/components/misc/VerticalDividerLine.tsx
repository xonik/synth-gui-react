import './VerticalDividerLine.scss'

type Props = {
    x: number
    y: number
    length: number
}

const PADDING = 5

export const VerticalDividerLine = ({ x, y, length }: Props) => {
    return <line x1={x} y1={y + PADDING} x2={x} y2={y + length - 3} className="vertical-divider-line" />
}
