import React from 'react';
import './Header.scss';
import './SubHeader.scss';

type PositionAlign = 'center' | 'left' | 'right';

interface Props {
    x: number,
    y: number,
    width: number,
    align?: PositionAlign,
    labelPosition?: PositionAlign
    label?: string,
}

const getCenter = (x: number, y: number, width: number, align: PositionAlign) => {
    switch (align) {
        case 'center':
            return x;
        case 'left':
            return x + width / 2;
        case 'right':
            return x - width / 2;
    }
}

const SubHeader = ({ x, y, width, align = 'left', label, labelPosition = 'center' }: Props) => {

    const center = getCenter(x, y, width, align);

    return <>
        {label && <text
            x={labelPosition === 'center' ? center : x + 1}
            y={y + 5.5}
            className="subheader-label"
            textAnchor={labelPosition === 'center' ? "middle" : "left"}
            alignmentBaseline="baseline"
        >{label}</text>}
        <line x1={center - width / 2} y1={y} x2={center + width / 2} y2={y} className="header-underline"/>
    </>;
};


export default SubHeader;