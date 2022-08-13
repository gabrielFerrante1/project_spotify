import styles from './Player.module.css';

import { message } from 'antd';
import {
    Row,
    Col
} from 'react-bootstrap';

import {
    useEffect,
    useState
} from "react";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../libs/redux/store';
import { setIsPlayingMusic, setPause, setResetAudioOnAlterationPlaylist } from '../../libs/redux/reducers/playerReducer';
import { ControlsOptions } from './ControlsOptions';
import ControlsPlayerCenter from './ControlsPlayerCenter';
import ControlsPlayerSlider from './ControlsPlayer';
import { api } from '../../libs/api';
import { useSession } from 'next-auth/react';


export const Controls = () => {
    const { data: sessionClient } = useSession();

    const player = useSelector((state: RootState) => state.player);
    const dispatch = useDispatch();

    const [valueVolume, setValueVolume] = useState(100);
    const [valueTime, setValueTime] = useState(0);
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoop, setIsLoop] = useState(false);
    const [nextAudioAutomatic, setNextAudioAutomatic] = useState(0);

    audio?.addEventListener('timeupdate', () => {
        let result = 0
        if (audio != undefined) {
            result = audio.duration - audio.currentTime;
            setValueTime(audio.currentTime);
        }

        if (player.playlist.length < 1) {
            if (result == 0) {
                dispatch(setPause(true))
                setValueTime(0)
            }
        } else {
            if (!isLoop) {
                if (result <= 1.5 && nextAudioAutomatic == 0) {
                    setNextAudioAutomatic(1);
                }
            }
        }
    });

    const alterTrack = (type: string) => {
        const count: number = player.playlist.length;
        const result: number = player.isPlayingMusic - 1;
        const result2: number = player.isPlayingMusic + 1;

        dispatch(setResetAudioOnAlterationPlaylist(true))

        if (type == 'voltar') {
            if (result >= 0 && result < count) {
                setValueTime(0);
                dispatch(setPause(false))

                dispatch(setIsPlayingMusic(result));
            } else {
                message.info('Não há mais músicas nesta playlist', 2);
            }
        } else if (type == 'proxima') {
            if (result2 >= 0 && result2 < count) {
                setValueTime(0);
                dispatch(setPause(false))

                dispatch(setIsPlayingMusic(result2));
            } else {
                message.info('Não há mais músicas nesta playlist', 2);
            }
        }
    }

    useEffect(() => {
        if (player.resetAudioOnAlterationPlaylist) { 
            setAudio(new Audio(player.playlist.length > 0 && player.isPlayingMusic >= 0 ?
                player.playlist[player.isPlayingMusic].path
                :
                ''));

            if (audio != undefined) dispatch(setPause(true))

        } else {

            dispatch(setResetAudioOnAlterationPlaylist(true))
        }
    }, [player.playlist, player.isPlayingMusic]);

    const setNewMusicHeard = async () => { 
        if (player.isPlayingData.tipo == 'Música') {
            await api(`music-heard/${player.isPlayingData.id}`, 'post', {}, sessionClient?.user.jwt)
        }
    }

    useEffect(() => {
        if (audio != undefined) {
            audio.autoplay = true;
            audio.volume = valueVolume / 100;
            audio.loop = isLoop;

            setNextAudioAutomatic(0);
            dispatch(setPause(false))

            if (sessionClient) {
                setNewMusicHeard();
            }
        }
    }, [audio]);

    useEffect(() => {
        if (nextAudioAutomatic == 1) {
            if (!isLoop) {
                const result2: number = player.isPlayingMusic + 1;
                const count: number = player.playlist.length
                if (count > 0 && result2 >= 0 && result2 < count) {
                    dispatch(setPause(true))
                    setValueTime(0);

                    alterTrack('proxima')
                } else {
                    dispatch(setPause(true))
                    setValueTime(0);
                }

            } else {
                setNextAudioAutomatic(0);
            }

        }
    }, [nextAudioAutomatic]);

    useEffect(() => {
        if (audio != undefined) {
            if (player.pause) {
                audio.pause()
                setIsPlaying(false)
            } else {
                audio.play()
                setIsPlaying(true)
            }
        }
    }, [player.pause])

    return (
        <Row >
            <Col md={8}>
                <div className={styles.audioControls}>
                    <div className='d-flex'>
                        <ControlsPlayerCenter
                            audio={audio}
                            isPlaying={isPlaying}
                            setValueTime={setValueTime}
                            alterTrack={alterTrack}
                        />
                    </div>

                    <ControlsPlayerSlider
                        audio={audio}
                        valueTime={valueTime}
                        setValueTime={setValueTime}
                    />
                </div>
            </Col>

            <Col offset={2}>
                <div className={styles.controlMoreOptions}>
                    <ControlsOptions
                        audio={audio as HTMLAudioElement}
                        setLoop={setIsLoop}
                        loop={isLoop}
                        setVolume={setValueVolume}
                        volume={valueVolume}
                    />
                </div>
            </Col>
        </Row>
    )
}