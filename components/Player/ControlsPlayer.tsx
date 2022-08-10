import styles from './Player.module.css';

import Slider from '@mui/material/Slider';
import { useSelector } from 'react-redux';
import { RootState } from '../../libs/redux/store';

type Props = {
    audio: HTMLAudioElement | undefined,
    valueTime: number, 
    setValueTime: (a: number) => void
}

export default ({ audio, valueTime, setValueTime }: Props) => {
    const player = useSelector((state: RootState) => state.player)

    const handleChangeTime = (_event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            if (audio?.currentTime) {
                audio.currentTime = newValue;
            }
            setValueTime(newValue);
        }
    };

    return (
        <div className={styles.controlSlider}>
            {!player.loadingAudio ?
                <>
                    <span style={{ marginRight: '7px' }} className={styles.controlSliderTime}>
                        {(valueTime / 60).toFixed(2)}
                    </span>

                    <Slider
                        size="medium"
                        aria-label="Time"
                        className="text-white"
                        onChange={handleChangeTime}
                        value={typeof valueTime == 'number' ? valueTime : parseFloat(valueTime)}
                        max={!isNaN(audio?.duration as number) && audio != undefined ? audio?.duration : 0}
                    />

                    <span style={{ marginLeft: '7px' }} className={styles.controlSliderTime}>
                        {!isNaN(audio?.duration as number) && (audio?.duration as number / 60).toFixed(2)}
                    </span>
                </>
                : 
              <div style={{background: 'red'}}>dd</div>
              }
        </div>
    )
}