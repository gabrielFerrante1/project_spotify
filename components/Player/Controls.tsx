import styles from './Player.module.css';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';
import Slider from '@mui/material/Slider'; 

import {message} from 'antd';
import {
    Row,
    Col
} from 'react-bootstrap';

import { 
    useEffect,  
    useState,
    SyntheticEvent
} from "react"; 

import { 
    PauseOutlined,
    StepBackwardOutlined,
    StepForwardOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setIsPlayingData, setIsPlayingTrack, setResetAudioOnAlterationPlaylist } from '../../redux/reducers/playerReducer';
import { ControlsOptions } from './ControlsOptions';


export const Controls = () => {
    const player = useSelector((state: RootState)=>state.player);
    const dispatch = useDispatch(); 

    const [valueVolume, setValueVolume] = useState<number>(100);
    const [valueTime, setValueTime] = useState<number>(0);  
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLoop, setIsLoop] = useState<boolean>(false);
    const [nextAudioAutomatic, setNextAudioAutomatic] = useState<number>(0);

    //Event listeners 
    audio?.addEventListener('timeupdate', (ev:  SyntheticEvent<HTMLAudioElement>) => {
        const result = ev.currentTarget.duration - ev.currentTarget.currentTime;
        setValueTime(ev.currentTarget.currentTime);

        if(player.playlist.length < 1) {
            if(result == 0) {
                setIsPlaying(false);
                setValueTime(0);
            }
        } else {
            if(!isLoop) {
                if(result <= 1.5 && nextAudioAutomatic == 0) {
                    setNextAudioAutomatic(1);
                }
            } 
        }
    });  

    const togglePlay = () => {
        if(isPlaying) {
            audio?.pause();
            setIsPlaying(false);
        } else {
            audio?.play();
            setIsPlaying(true);
        }
    }

    const handleChangeTime = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            if(audio?.currentTime) {
                audio.currentTime =  newValue;
            }
          setValueTime(newValue);
        } 
    };

    const alter10SecondsTime = (payload: string) => {
        if(audio != undefined) {
            if(payload == 'menos') {
                audio.currentTime = audio.currentTime - 10; 
            } else {
                audio.currentTime = audio.currentTime + 10;
            }
            setValueTime(audio.currentTime);
        }
    }

    const alterTrack = (type: string) => {
        const count: number = player.playlist.length;
        const result: number = player.isPlaying - 1;
        const result2: number = player.isPlaying + 1;

        if(type == 'voltar') {
            if(result >= 0 && result < count) {
                setValueTime(0);
                setIsPlaying(true); 
                audio?.pause();

                dispatch(setIsPlayingTrack(result)); 
            } else {
                message.info('Não há mais músicas nesta playlist', 2);
            }
        } else if (type == 'proxima') {
            if(result2 >= 0  && result2 < count) {
                setValueTime(0);
                setIsPlaying(true); 
                audio?.pause();

                dispatch(setIsPlayingTrack(result2)); 
            } else {
                message.info('Não há mais músicas nesta playlist', 2);
            }
        } 
    }
 
 
    useEffect(()=>{
        if(player.resetAudioOnAlterationPlaylist) {
            if(audio != undefined) audio.pause(); 
            setAudio(new Audio(player.playlist.length > 0 && player.isPlaying >= 0 ? 
                player.playlist[player.isPlaying].path
                :
                ''));
            if(audio != undefined)
            setIsPlaying(true); 
        } else {
            dispatch(setResetAudioOnAlterationPlaylist(true))
        }
      
    }, [player.playlist, player.isPlaying]);

    useEffect(()=>{
        if(audio != undefined) { 
            audio.autoplay = true;
            audio.volume = valueVolume / 100;
            audio.loop = isLoop;

            setNextAudioAutomatic(0);
        }
    }, [audio]);

    useEffect(()=>{
        if(nextAudioAutomatic == 1) {
            if(!isLoop) {
                const result2: number = player.isPlaying + 1;
                const count: number = player.playlist.length
                if(count > 0 && result2 >= 0 && result2 < count) {
                    setIsPlaying(true);
                    setValueTime(0);

                    alterTrack('proxima')
                }  else {
                    setIsPlaying(false);
                    setValueTime(0);
                }
               
            } else {
                setNextAudioAutomatic(0);
            }
           
        } 
    }, [nextAudioAutomatic]);

    return (
        <Row >  
            <Col md={8}>
                <div className={styles.audioControls}> 
                    <div className='d-flex'>
                        <div style={{alignSelf:'center'}}>
                            <Replay10Icon
                                onClick={()=>alter10SecondsTime('menos')}
                                className={styles.controlAudioReplay10}
                            />
                        </div>

                        <div  style={{alignSelf:'center'}} hidden={player.playlist.length <= 1}>
                            <StepBackwardOutlined
                                onClick={()=>alterTrack('voltar')}
                                className={styles.controlAudioBackwardPlaylist}
                            />
                        </div>

                        <button className={styles.controlPlay} onClick={togglePlay}>
                            {isPlaying ? 
                                <PauseOutlined style={{fontSize:'25px'}}/>
                                    :
                                <PlayArrowIcon style={{fontSize:'26px'}} />
                            }
                        </button>

                        <div  style={{alignSelf:'center'}} hidden={player.playlist.length <= 1}>
                            <StepForwardOutlined
                                onClick={()=>alterTrack('proxima')}
                                className={styles.controlAudioForwardPlaylist}
                            />
                        </div>

                        <div style={{alignSelf:'center'}}>
                            <Forward10Icon
                                onClick={()=>alter10SecondsTime('mais')}
                                className={styles.controlAudioForward10}
                            />
                        </div>
                    </div>

                    <div className={styles.controlSlider}> 
                        <span style={{marginRight:'7px'}} className={styles.controlSliderTime}>
                            {(valueTime / 60).toFixed(2)}
                        </span> 
 
                        <Slider
                            size="medium"
                            aria-label="Time"
                            style={{color:'white'}}
                            onChange={handleChangeTime}
                            value={typeof valueTime == 'number' ? valueTime : parseFloat(valueTime)}
                            max={!isNaN(audio?.duration as number) && audio != undefined ? audio?.duration : 0}
                        />
 
                        <span style={{marginLeft:'7px'}} className={styles.controlSliderTime}>
                            {!isNaN(audio?.duration as number) && (audio?.duration as number / 60).toFixed(2)}
                        </span> 
                       
                    </div>
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