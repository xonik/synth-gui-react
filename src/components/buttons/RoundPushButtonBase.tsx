import { SHOW_CUT } from '../../config'
import './RoundButton.scss'

interface Props {
    onClick: () => void
    onRelease?: () => void
    buttonRadius: number
    cutRadius: number
    className: string
}

const RoundPushButtonBase = ({ buttonRadius, cutRadius, className, onClick, onRelease }: Props) => {
    return (
        <circle
            cx={0}
            cy={0}
            r={SHOW_CUT ? cutRadius : buttonRadius}
            className={className}
            onMouseDown={onClick}
            onMouseUp={onRelease}
        />
    )
}

export default RoundPushButtonBase
