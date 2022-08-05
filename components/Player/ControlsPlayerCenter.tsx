import styles from './Player.module.css';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import {
    PauseOutlined,
    StepBackwardOutlined,
    StepForwardOutlined
} from "@ant-design/icons";
import Forward10Icon from '@mui/icons-material/Forward10';
import Replay10Icon from '@mui/icons-material/Replay10';

import { useSelector } from 'react-redux';
import { RootState } from '../../libs/redux/store';

type Props = {
    audio: HTMLAudioElement | undefined,
    isPlaying: boolean,
    setIsPlaying: (a: boolean) => void,
    setValueTime: (a: number) => void,
    alterTrack: (type: string) => void
}

export default ({ audio, isPlaying, setIsPlaying, setValueTime, alterTrack }: Props) => {
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
            audio?.pause();
            setIsPlaying(false);
        } else {
            audio?.play();
            setIsPlaying(true);
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