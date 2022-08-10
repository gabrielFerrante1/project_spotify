import styles from './Player.module.css';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import {
    PauseOutlined,
    StepBackwardOutlined,
    StepForwardOutlined
} from "@ant-design/icons";
import Forward10Icon from '@mui/icons-material/Forward10';
import Replay10Icon from '@mui/icons-material/Replay10';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../libs/redux/store';
import { setPause } from '../../libs/redux/reducers/playerReducer';

type Props = {
    audio: HTMLAudioElement | undefined,
    isPlaying: boolean, 
    setValueTime: (a: number) => void,
    alterTrack: (type: string) => void
}

export default ({ audio, isPlaying, setValueTime, alterTrack }: Props) => {
    const dispatch = useDispatch()
    const player = useSelector((state: RootState) => state.player);

    const alter10SecondsTime = (payload: string) => {
        if (audio != undefined) {
            if (payload == 'menos') {
                audio.currentTime = audio.currentTime - 10;
            } else {
                audio.currentTime = audio.currentTime + 10;
            }
            setValueTime(audio.currentTime);
        }
    }

    const togglePlay = () => {
        if (isPlaying) {
            dispatch(setPause(true))
        } else {
            dispatch(setPause(false))
        }
    }
    return (
        <div className="d-flex">
            <div className="align-self-center">
                <Replay10Icon
                    onClick={() => alter10SecondsTime('menos')}
                    className={styles.controlAudioReplay10}
                />
            </div>

            <div className="align-self-center text-white" hidden={player.playlist.length <= 1}>
                <StepBackwardOutlined
                    onClick={() => alterTrack('voltar')}
                    className={styles.controlAudioBackwardPlaylist}
                />
            </div>

            <button className={styles.controlPlay} onClick={togglePlay}>
                {isPlaying ?
                    <PauseOutlined style={{ fontSize: '25px' }} />
                    :
                    <PlayArrowIcon style={{ fontSize: '26px' }} />
                }
            </button>

            <div className="align-self-center text-white" hidden={player.playlist.length <= 1}>
                <StepForwardOutlined
                    onClick={() => alterTrack('proxima')}
                    className={styles.controlAudioForwardPlaylist}
                />
            </div>

            <div className="align-self-center">
                <Forward10Icon
                    onClick={() => alter10SecondsTime('mais')}
                    className={styles.controlAudioForward10}
                />
            </div>
        </div>
    )
}