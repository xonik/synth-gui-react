import { dacStartUpdates, dacStopUpdates } from '@/midi/rpc/api'
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
            </div>
        </div>
    )
}
