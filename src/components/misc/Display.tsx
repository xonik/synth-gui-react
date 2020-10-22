import React from 'react';
import './Display.scss';


interface Props {
  x: number,
  y: number,
  height: number,
  width: number,
}

const Display = ({ x, y, height, width }: Props) => {

  return <rect
      x={x}
      y={y}
      height={height}
      width={width}
      className="display"
    />;
};



export default Display;