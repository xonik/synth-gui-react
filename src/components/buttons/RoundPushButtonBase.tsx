import React from 'react';
import './RoundButton.scss';

interface Props {
  onClick: () => void;
  buttonRadius: number;
  className: string;
}

export default ({buttonRadius, className, onClick}: Props) =>
    <circle cx={0} cy={0} r={buttonRadius} className={className} onClick={onClick}/>