import {
    dacDisableInternalRef,
    dacEnableInternalRefAPU,
    dacEnableInternalRefDefaultMode,
    dacPowerDown,
    dacPowerUp,
    dacStartUpdates,
    dacStopUpdates,
} from '@/midi/rpc/api'
import Button from '../components/Button'
import './DacSettings.scss'

type Props = { voice: number }

export const DacSettings = ({ voice }: Props) => {
    return (
        <div className="dac-settings">
            <div className="dac-settings__columns">
                <div className="dac-settings__column">
                    <div className="dac-settings__column-heading">CV updating</div>
                    <Button active onClick={() => dacStopUpdates(voice)}>
                        Stop
                    </Button>
                    <Button active onClick={() => dacStartUpdates(voice)}>
                        Start
                    </Button>
                </div>
                <div className="dac-settings__column">
                    <div className="dac-settings__column-heading">Internal ref</div>
                    <Button active onClick={() => dacDisableInternalRef(voice)}>
                        Disable
                    </Button>
                    <Button active onClick={() => dacEnableInternalRefAPU(voice)}>
                        Enable APU
                    </Button>
                    <Button active onClick={() => dacEnableInternalRefDefaultMode(voice)}>
                        Enable default
                    </Button>
                </div>
                <div className="dac-settings__column">
                    <div className="dac-settings__column-heading">Power</div>
                    <Button active onClick={() => dacPowerDown(voice)}>
                        Power down
                    </Button>
                    <Button active onClick={() => dacPowerUp(voice)}>
                        Power up
                    </Button>
                </div>
            </div>
        </div>
    )
}
