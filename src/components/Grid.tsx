const minLines = 5
const midLines = 10

//const scaleX = POT_DISTANCE_M/2
const scaleX = 50
const medUnitX = scaleX / midLines
const minUnitX = medUnitX / minLines

//const gridOffsetX = PADDING_LEFT + 20
const gridOffsetX = 0

type Props = {
    panelHeight: number
    panelWidth: number
}

const Grid = ({ panelHeight, panelWidth }: Props) => {
    const grid = []

    for (let i = 1; i < panelHeight; i += 1) {
        if (i % minLines === 0) {
            if (i % (midLines * minLines) === 0) {
                grid.push(<line x1={0} y1={i} x2={panelWidth} y2={i} className="panel-grid-50" />)
            } else {
                grid.push(<line x1={0} y1={i} x2={panelWidth} y2={i} className="panel-grid-5" />)
            }
        } else {
            grid.push(<line x1={0} y1={i} x2={panelWidth} y2={i} className="panel-grid-1" />)
        }
    }

    for (let i = 1; i < panelWidth; i += 1) {
        if (i % minLines === 0) {
            if (i % (midLines * minLines) === 0) {
                grid.push(
                    <line
                        x1={gridOffsetX + i * minUnitX}
                        y1={0}
                        x2={gridOffsetX + i * minUnitX}
                        y2={panelHeight}
                        className="panel-grid-50"
                    />
                )
            } else {
                grid.push(
                    <line
                        x1={gridOffsetX + i * minUnitX}
                        y1={0}
                        x2={gridOffsetX + i * minUnitX}
                        y2={panelHeight}
                        className="panel-grid-5"
                    />
                )
            }
        } else {
            grid.push(
                <line
                    x1={gridOffsetX + i * minUnitX}
                    y1={0}
                    x2={gridOffsetX + i * minUnitX}
                    y2={panelHeight}
                    className="panel-grid-1"
                />
            )
        }
    }

    return <>{grid}</>
}

export default Grid
