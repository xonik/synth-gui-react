import React from "react";

type Props = {
    panelHeight: number
    panelWidth: number
}

const Grid = ({panelHeight, panelWidth}: Props) => {

    const grid = []

    for(let i=1; i<panelHeight; i += 1){
        if(i % 5 === 0) {
            if (i % 50 === 0) {
                grid.push(<line x1={0} y1={i} x2={panelWidth} y2={i} className="panel-grid-50"/>)
            } else {
                grid.push(<line x1={0} y1={i} x2={panelWidth} y2={i} className="panel-grid-5"/>)
            }
        } else {
            grid.push(<line x1={0} y1={i} x2={panelWidth} y2={i} className="panel-grid-1"/>)
        }
    }

    for(let i=1; i<panelWidth; i += 1){
        if(i % 5 === 0) {
            if (i % 50 === 0) {
                grid.push(<line x1={i} y1={0} x2={i} y2={panelHeight} className="panel-grid-50"/>)
            } else {
                grid.push(<line x1={i} y1={0} x2={i} y2={panelHeight} className="panel-grid-5"/>)
            }
        } else {
            grid.push(<line x1={i} y1={0} x2={i} y2={panelHeight} className="panel-grid-1"/>)
        }
    }

    return <>{grid}</>
}

export default Grid