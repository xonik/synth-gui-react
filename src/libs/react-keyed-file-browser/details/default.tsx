import React from 'react'
import { DetailRendererProps } from '../types'
import './details.scss'

const DefaultDetails: React.FC<DetailRendererProps> = ({ file, close }) => {
    function handleCloseClick(event: React.MouseEvent<HTMLElement>) {
        if (event) {
            event.preventDefault()
        }

        close()
    }

    const path = file.key.split('/')
    const name = path.length ? path[path.length - 1] : ''

    return (
        <div className="filedetails">
            <div className="filedetails__content">
                <h2>Item Detail</h2>
                <dl>
                    <dt>Key</dt>
                    <dd>{file.key}</dd>

                    <dt>Name</dt>
                    <dd>{name}</dd>
                </dl>
            </div>
            <div className="filedetails__actions">
                <button onClick={handleCloseClick}>
                    Close
                </button>
            </div>
        </div>
    )
}

export { DefaultDetails }
