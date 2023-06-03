import React, { useEffect, useState } from 'react'
import { DetailRendererProps } from '../types'
import './details.scss'
import Button from '../../../controller/Button'

const DefaultDetails: React.FC<DetailRendererProps> = (
    {
        file,
        close,
        mode,
        onAudit,
        onLoad,
    }) => {

    const [audit, setAudit] = useState(false)

    useEffect(() => {
        setAudit(false)
    }, [file])

    function handleAuditClick(event?: React.MouseEvent<HTMLElement>) {
        if (event) {
            event.preventDefault()
        }

        if(!file){
            return
        }

        if(audit) {
            setAudit(false)
            onAudit?.('')
        } else {
            setAudit(true)
            onAudit?.(file.key)
        }
    }

    function handleLoadClick(event?: React.MouseEvent<HTMLElement>) {
        if (event) {
            event.preventDefault()
        }

        if(!file){
            return
        }

        onLoad?.('')
    }

    const path = file?.key.split('/') || ''
    const name = path.length ? path[path.length - 1] : ''

    return (
        <div className="filedetails">
            <div className="filedetails__content">
                <h2>Details</h2>
                <div>Name</div>
                <div>{name}</div>
            </div>
            <div className="filedetails__actions">
                {mode === 'save' &&
                    <Button active={Boolean(audit)} onClick={handleAuditClick}>
                        Audit
                    </Button>
                }
                {mode === 'load' &&
                    <Button active={true} onClick={handleLoadClick}>
                        Load
                    </Button>
                }
            </div>
        </div>
    )
}

export { DefaultDetails }
