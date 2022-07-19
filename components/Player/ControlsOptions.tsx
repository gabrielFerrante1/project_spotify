import styles from './Player.module.css';

import Slider from '@mui/material/Slider'; 
import { PopoverGrf } from '../PopoverGrf';

import LoopIcon from '@mui/icons-material/Loop'; 
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';  

import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setViewPlaylist } from '../../redux/reducers/playerReducer'; 

type Props = {
    audio: HTMLAudioElement,
    setLoop: (a: boolean) => void,
    loop: boolean,
    setVolume: (a: number) => void,
    volume: number
}

export const  ControlsOptions = (p: Props) => {
    const player = useSelector((state: RootState) => state.player);
    const dispatch = useDispatch(); 

    //Change loop
    const toggleLoop = () => {
        if(p.loop) {
            p.audio.loop = false;
            p.setLoop(false);
        } else if (!p.loop) {
            p.audio.loop = true;
            p.setLoop(true);
        }
    }

    //Change volume
    const toggleAlterVolume = () => {
        if(p.audio != undefined) {
            if (p.volume <= 0) {
                p.audio.volume = 1;
                p.setVolume(100);
            } else {
                p.audio.volume = 0;
                p.setVolume(0);
            }
        }
    }

    const handleChangeVolume = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            if(!isNaN(p.audio.volume)) {
                p.audio.volume =  newValue / 100;
            }

            p.setVolume(newValue);
        } 
    }

    //Change playlist
    const toggleViewPlaylist = () => {
        dispatch(setViewPlaylist(!player.viewPlaylist))
    }
 

    return (
        <>  
            <PopoverGrf title={
                p.loop ? 'Desativar loop' : 'Ativar loop'
            }> 
                <LoopIcon
                    onClick={toggleLoop}
                    className={`${styles.controlAudioLoop}   ${p.loop && styles.controlActive} `}
                />
            </PopoverGrf> 
        
            <div hidden={player.playlist.length <= 1 && true}>
                <ListAltOutlinedIcon
                    onClick={toggleViewPlaylist}
                    className={`${styles.controlAudioQueuePlaylist} ${player.viewPlaylist && styles.controlActive}`}
                />
            </div>

            {p.volume <= 0 ?
                    <VolumeOffIcon onClick={toggleAlterVolume} className={styles.controlAudioVolume}/>
                    :
            p.volume <= 40 ?
                    <VolumeDownIcon onClick={toggleAlterVolume} className={styles.controlAudioVolume}/>
                    :
                    <VolumeUpIcon onClick={toggleAlterVolume} className={styles.controlAudioVolume}/>
            }

            <Slider 
                size='small'
                style={{width:'40%',marginLeft:'16px',color:'white'}}
                aria-label="Volume"  
                value={p.volume}
                onChange={handleChangeVolume}
                max={100}
            />

           
        </>
    )
}