import React from 'react';
import Header from '../misc/Header';

interface Props {
    x: number,
    y: number
}

const ExtAudio = ({ x, y }: Props) => {

    const row1 = y;

    return <>
        <Header label="Ext audio" x={x} y={row1} width={175}/>
    </>;
};

export default ExtAudio;