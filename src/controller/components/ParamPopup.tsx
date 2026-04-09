import { useParamPopupStore } from '@/store/paramPopupStore'
import './ParamPopup.scss'
const ParamPopup = () => {
    const visible = useParamPopupStore((s) => s.visible)
    const moduleName = useParamPopupStore((s) => s.moduleName)
    const paramName = useParamPopupStore((s) => s.paramName)
    const paramValue = useParamPopupStore((s) => s.paramValue)
    if (!visible) return null
    return (
        <div className="param-popup">
            <div className="param-popup__box">
                <div className="param-popup__module">{moduleName}</div>
                <div className="param-popup__name">{paramName}</div>
                <div className="param-popup__value">{paramValue}</div>
            </div>
        </div>
    )
}
export default ParamPopup
