import React from 'react';

interface Props {
  buttonRadius: number;
}

const pushButton = ({buttonRadius}: Props) => <circle cx="0" cy="0" r={buttonRadius} className="button-cap"/>

export default pushButton;