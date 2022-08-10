import { Typography } from '@mui/material';
import { Avatar, Divider } from 'antd';
import * as React from 'react';
import { Music } from '../../libs/types/Music';
import styles from './MusicsPlaylist.module.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../libs/redux/store';
import { useRouter } from 'next/router';
import { setIsPlayingData, setIsPlayingMusic } from '../../libs/redux/reducers/playerReducer';

export default function MusicsPlaylist() {
    const player = useSelector((state: RootState) => state.player);

    const dispatch = useDispatch();
    const router = useRouter();

    const [list, setList] = React.useState<Music[]>([]);

    const setTracks = (index: number) => {
        dispatch(setIsPlayingMusic(index));

        dispatch(setIsPlayingData({
            id: player.isPlayingData.id,
            tipo: 'Playlist'
        }));
    }

    React.useEffect(() => {
        setList(player.playlist);
    }, [player.playlist]);

    return (
        <div hidden={list.length < 1}>
            <Typography style={{ color: 'rgb(191, 191, 191)', fontSize: '13px', minWidth: '400px', display: 'block' }} variant="overline">
                Músicas desta playlist:
            </Typography>

            <Divider style={{ background: 'rgb(159, 157, 157)', margin: '0 0 10px 0' }} />

            <ul className={styles.content}>
                {list.map((item, index) => (
                    <li style={{ border: index + 1 != list.length ? ' ' : 'none' }} className={`${player.isPlayingMusic == index ? styles.contentActive : styles.contentLi}`} key={index}>
                        <div style={{ alignSelf: 'center' }}>
                            <Typography className={styles.titleId} variant="caption">
                                {index + 1}
                            </Typography>

                            <PlayArrowIcon
                                style={{ cursor: 'pointer' }}
                                onClick={() => setTracks(index)}
                                className={player.isPlayingData.id === item.id && player.isPlayingData.tipo === item.tipo ? 'd-none' : styles.titleActionMusic}
                            />
                        </div>

                        <div style={{ alignSelf: 'center' }}>
                            <Avatar
                                shape='square'
                                size={33}
                                src={item.avatar}
                            />
                        </div>

                        <div className={styles.contentInfo} style={{ alignSelf: 'center' }}>
                            <Typography variant="caption">
                                {item.name}
                            </Typography>

                            <small>
                                {item.author}
                            </small>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}