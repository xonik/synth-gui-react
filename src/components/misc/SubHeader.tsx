import React from 'react';
import './SubHeader.scss';
import { BORDER_MARGIN } from "../../constants";

type PositionAlign = 'center' | 'left' | 'right';

interface Props {
    x: number,
    y: number,
    width: number,
    align?: PositionAlign,
    labelPosition?: PositionAlign
    label?: string,
    labelWidth?: number,
    padding?: 'left' | 'right' | 'both'
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

const SubHeader = ({ x, y, width, align = 'left', label, labelWidth, labelPosition = 'center', padding = 'both' }: Props) => {

    const center = getCenter(x, y, width, align);

    const paddingLeft = padding != 'right' ? BORDER_MARGIN : 0
    const paddingRight = padding != 'left' ? BORDER_MARGIN : 0

    return <>
        <rect
            x={x + paddingLeft} y={y + BORDER_MARGIN / 2}
            width={width - paddingLeft - paddingRight} height={1}
            className="subheader-border"
        />

        <polygon points={getLabelBackground(x, y, labelWidth ?? 30, width, labelPosition)} className="subheader-border"/>
        {label && <text
            x={labelPosition === 'center' ? center : x + 3}
            y={y + 3.85}
            className="subheader-label"
            textAnchor={labelPosition === 'center' ? "middle" : "left"}
            alignmentBaseline="baseline"
        >{label}</text>}
    </>;
};

const getLabelBackground = (x: number, y: number, labelWidth: number, width: number, labelPosition: PositionAlign) => {
    const height = 3.5
    const offset = 1.5

    const leftOffset = labelPosition === 'left' ? 0 : -offset;
    const rightOffset = labelPosition === 'right' ? 0 : offset;

    let mapper
    if(labelPosition == 'left'){
        mapper = ([x0, y0]: Array<number>) => [x + BORDER_MARGIN + x0, y + BORDER_MARGIN + y0]
    } else {
        mapper = ([x0, y0]: Array<number>) => [x + width / 2 - labelWidth  / 2 + x0, y + BORDER_MARGIN + y0]
    }

    return [
        [leftOffset, 0],
        [labelWidth + rightOffset, 0],
        [labelWidth, height],
        [0, height],
    ]
        .map(mapper)
        .map(([x0, y0]) => `${x0},${y0}`)
        .join(' ')
}


export default SubHeader;