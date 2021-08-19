import React from 'react';
import './RoundButton.scss';

interface Props {
  onClick: () => void;
  onRelease?: () => void;
  buttonRadius: number;
  className: string;
}

const RoundPushButtonBase = ({buttonRadius, className, onClick, onRelease}: Props) =>
    <circle cx={0} cy={0} r={buttonRadius} className={className} onMouseDown={onClick} onMouseUp={onRelease}/>

export default RoundPushButtonBase