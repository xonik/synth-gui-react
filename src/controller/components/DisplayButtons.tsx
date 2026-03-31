import './DisplayButtons.scss'

export const DisplayButtons = () => {

    const buttonLabels = ['LFOs', 'Osc', 'Filters', 'Envelopes', 'Mods', 'FX']

    return <div className="display-buttons">{buttonLabels.map((label) => {
        return <div key={label} className="display-buttons__label">
            {label}
        </div>
    })}</div>
}