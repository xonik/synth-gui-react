import React from 'react'
import { useAppSelector } from '../../synthcore/hooks'
import { digitalModSources, digitalModTargets } from '../../midi/controllers'
import './ModControl.scss'

const ModControl = () => {

    const targetGroup = digitalModTargets['SOUND_SOURCES']

    return <div className="mod-ctrl">
        <div className="mod-ctrl__sources">
            {Object.values(digitalModSources)
                .map((group) => {
                    return Object.entries(group)
                        .filter(([funcKey, func]) => funcKey !== 'label')
                        .map(([funcKey, func]) => {
                            const funcValue = func as { [key: string]: any }

                            return <div className="mod-ctrl__source" key={funcKey}>
                                <div className="mod-ctrl__source--heading">
                                    FUNC {funcValue.props?.label}
                                </div>
                                {Object.entries(funcValue)
                                    .filter(([controllerKey]) => controllerKey !== 'props')
                                    .map(([, controller]) => {
                                        console.log('CONT', controller)
                                        return <div
                                            className="mod-ctrl__source--controller"
                                            key={controller.id}>
                                            PARAM {controller.label}
                                        </div>
                                    })}
                            </div>
                        })
                })
            }
        </div>
        <div className="mod-ctrl__targets">
            {Object.entries(targetGroup)
                .filter(([funcKey, func]) => funcKey !== 'label')
                .map(([funcKey, func]) => {
                    const funcValue = func as { [key: string]: any }

                    return <div className="mod-ctrl__target" key={funcKey}>
                        <div className="mod-ctrl__target--heading">
                            {funcValue.props.label}
                        </div>
                        {Object.entries(funcValue)
                            .filter(([controllerKey]) => controllerKey !== 'props')
                            .map(([, controller]) => <div
                                    className="mod-ctrl__target--controller"
                                    key={controller.id}>
                                    {controller.label}
                                </div>
                            )}
                    </div>
                })
            }
        </div>
    </div>
}

export default ModControl