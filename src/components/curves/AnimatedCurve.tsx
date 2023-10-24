import React, { useMemo } from 'react'
import { useSpring, animated } from 'react-spring'
import classNames from 'classnames'
import { Point } from '../../utils/types'
import { getPointsString } from '../../utils/svg/pointsString'
import './AnimatedCurve.scss'

interface Props {
    x: number
    y: number
    width: number
    height: number
    points: Point[]
    className?: string
}

// Draw the desired curve between from and to.
// NB: SVG has 0,0 in upper left corner.
// NB: points must be between 0 and 1 in the y range.
const AnimatedCurve = ({ x, y, width, height, points, className }: Props) => {

    const pointsString = useMemo(() => getPointsString(points), [points]);

    const [{ animatedPoints }, setCurve] = useSpring(() => ({
        from: {animatedPoints: pointsString},
    }));

    setCurve({animatedPoints: pointsString})


    // We use a viewBox of 0,0, 1,1 to make the svg unit size. We can then use width and height to scale it
    // without having to recalculate points.

    // how to add image from Andromeda A6 as background:
    //<image x={0} y={0} height={1} width={1} xlinkHref={'./RisingExpo3.png'} preserveAspectRatio="none"/>
    return <svg x={x} y={y} viewBox="0 0 1 1" className={className} preserveAspectRatio="none" width={width} height={height}>
        <animated.polyline
            className={classNames('curve')}
            points={animatedPoints}
        />
    </svg>;
};

export default AnimatedCurve;