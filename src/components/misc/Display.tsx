import React from 'react';
import './Display.scss';


interface Props {
  x: number,
  y: number,
  height: number,
  width: number,
}

const Display = React.forwardRef<SVGRectElement, Props>(({ x, y, height, width }, ref) => {

  return <rect
      ref={ref}
      x={x}
      y={y}
      height={height}
      width={width}
      className="display"
    />;
});



export default Display;