import './HorizontalDividerLine.scss';

interface Props {
  x: number,
  y: number,
  width: number,
}

const PADDING = 7.5

export const HorizontalDividerLine = ({ x, y, width }: Props) => {

  return <>
    <line x1={x + PADDING} y1={y} x2={x + width - PADDING} y2={y} className="horizontal-divider-line" />
  </>;
};