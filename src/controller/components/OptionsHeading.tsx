import classNames from 'classnames'
import './OptionsHeading.scss'

interface Props {
    children: React.ReactNode
    separator?: boolean
}

const OptionsHeading = ({ children, separator }: Props) => {
    return <div className={classNames('options-heading', { 'options-heading--separator': separator })}>{children}</div>
}

export default OptionsHeading
