import React from 'react';
import './Header.scss';

type PositionAlign = 'center' | 'left' | 'right';

interface Props {
  x: number,
  y: number,
  width: number,
  align?: PositionAlign,
  label: string,
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

const Header = ({ x, y, width, align = 'left', label }: Props) => {

  const center = getCenter(x, y, width, align);

  return <>
    <text
      x={center}
      y={y+5}
      className="header-label"
      textAnchor="middle"
      alignmentBaseline="baseline"
    >{label}</text>
    <line x1={center - width / 2} y1={y+7} x2={center + width / 2} y2={y+7} className="header-underline" />
  </>;
};



export default Header;