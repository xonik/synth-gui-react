import React from 'react';
import './RoundButton.scss';

interface Props {
  buttonRadius: number;
  className: string;
}

const pushButton = ({buttonRadius, className}: Props) => <circle cx="0" cy="0" r={buttonRadius} className={className}/>
//const pushButton = ({buttonRadius, className}: Props) => <rect x={-4.05} y={-4.05} width={8.1} height={8.1}  className={className}/>

export default pushButton;