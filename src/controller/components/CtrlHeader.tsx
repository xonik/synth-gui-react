import './CtrlHeader.scss'

interface Props {
    leftOptionsLabel: string
    centerLabels: string[]
    rightOptionsLabel: string
}

const CtrlHeader = ({ leftOptionsLabel, centerLabels, rightOptionsLabel }: Props) => {
    return (
        <div className="ctrl-header">
            <div className="ctrl-header__label ctrl-header__label--left">{leftOptionsLabel}</div>
            <div className="ctrl-header__stages">
                {centerLabels.map((centerLabel) => {
                    return (
                        <div key={centerLabel} className="ctrl-header__stages__label">
                            {centerLabel}
                        </div>
                    )
                })}
            </div>
            <div className="ctrl-header__label ctrl-header__label--right">{rightOptionsLabel}</div>
        </div>
    )
}

export default CtrlHeader
