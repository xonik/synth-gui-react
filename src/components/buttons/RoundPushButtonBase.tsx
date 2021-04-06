import React from 'react';
import './RoundButton.scss';

interface Props {
  buttonRadius: number;
  className: string;
}

export default ({buttonRadius, className}: Props) => <circle cx={0} cy={0} r={buttonRadius} className={className}/>