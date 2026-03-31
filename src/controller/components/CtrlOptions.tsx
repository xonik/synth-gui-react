import OptionsHeading from '../components/OptionsHeading'
import '../components/CtrlOptions.scss'

interface Props {
    heading?: string
    separator?: boolean
    children: React.ReactNode
}

export const CtrlOptions = ({ heading, children, separator }: Props) => {

    return <div className="ctrl-options">
        {heading && <OptionsHeading separator={separator}>{heading}</OptionsHeading>}
        {children}
    </div>
}
