import React from 'react';
import './Line.scss';

type PositionAlign = 'center' | 'left' | 'right';

interface Props {
  x: number,
  y: number,
  width: number,
  align?: PositionAlign,
}

const getCenter = (x: number, y: number, width: number, align: PositionAlign) => {
  switch(align){
    case 'center':
      return x;
    case 'left':
      return x + width / 2;
    case 'right':
      return x - width / 2;
  }
}

const Line = ({ x, y, width, align = 'left' }: Props) => {

  const center = getCenter(x, y, width, align);

  return <>
    <line x1={center - width / 2} y1={y+7} x2={center + width / 2} y2={y+7} className="line" />
  </>;
};



export default Line;