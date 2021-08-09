import { useCallback, useState } from 'react'
import { Dimension } from './types'

// https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
export const useDimensions = (): [Dimension | undefined, (div: HTMLDivElement) => void] => {
    const [dimensions, setDimensions] = useState<Dimension>()
    const captureDimensions = useCallback((div: HTMLDivElement) => {
        if (div) {
            setDimensions({ h: div.clientHeight, w: div.clientWidth })
        }
    }, [])
    return [dimensions, captureDimensions]
}
