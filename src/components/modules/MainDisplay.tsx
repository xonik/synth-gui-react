import React from 'react';
import Display from '../misc/Display';

interface Props {
  x: number,
  y: number
}


const MainDisplay = ({ x, y }: Props) => {

  const displayWidth = 180;
  const displayHeight = 3 * displayWidth / 4;

  return <>
    <Display x={x} y={y} width={displayWidth} height={displayHeight}/>
  </>;
};

export default MainDisplay;