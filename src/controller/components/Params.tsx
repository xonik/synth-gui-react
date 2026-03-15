import './Params.scss'

interface Props {
    children: React.ReactNode
}

export const Params = ({ children }: Props) =>
    <div className="params">{children}</div>