import { Typography } from '@mui/material';
import { Avatar, Popconfirm, message } from 'antd';
import * as React from 'react';
import { Music } from '../../libs/types/Music';
import styles from './TablePlaylist.module.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../libs/redux/store';
import { setIsPlayingData, setIsPlayingMusic, setPause, setPlayList, setResetAudioOnAlterationPlaylist } from '../../libs/redux/reducers/playerReducer';
import { DeleteOutlined, PauseOutlined } from '@ant-design/icons';
import { api } from '../../libs/api';
import { MyPlaylist } from '../../libs/types/MyPlaylist';

type Props = {
    rows: Music[],
    idPlaylist: number,
    userJwt: string,
    setLoading: (a: boolean) => void
}

export default function TablePlaylist({ rows, idPlaylist, userJwt, setLoading }: Props) { 
    const player = useSelector((state: RootState) => state.player);

    const dispatch = useDispatch();

    const [tracks, setTracks] = React.useState<Music[]>(rows);

    const setTrack = (index: number) => {
        if (player.isPlayingData.id == idPlaylist && player.isPlayingMusic == index) {
            dispatch(setResetAudioOnAlterationPlaylist(false))
            dispatch(setPause(false))
            return;
        } else {
            dispatch(setResetAudioOnAlterationPlaylist(true))
        }

        dispatch(setIsPlayingData({
            id: idPlaylist,
            tipo: 'Playlist'
        }))
        dispatch(setPlayList(
            tracks
        ));

        dispatch(setIsPlayingMusic(index));
        dispatch(setPause(false))
    }

    const deleteMusic = async (id: number, index: number) => {
        setLoading(true);
        await api(`playlist`, 'delete', { id_music: id, id_playlist: idPlaylist }, userJwt);

        message.success('Música removida com sucesso');

        const data: MyPlaylist = await api(`playlist/${idPlaylist}`, 'get', {}, userJwt);

        if (data.playlist != undefined) {
            setTracks(data.playlist.musics);

            if (index <= player.isPlayingMusic) {
                dispatch(setPlayList([]));
                dispatch(setIsPlayingMusic(-1));
            } else {
                dispatch(setResetAudioOnAlterationPlaylist(false));
                dispatch(setPlayList(data.playlist.musics));
            }
        }

        setLoading(false);
    }

    const handleStopMusic = () => dispatch(setPause(true))

    React.useEffect(() => {
        setTracks(rows)
    }, [rows])
    return (
        <div>
            <table className={styles.tableTracks}>
                <tbody>
                    {tracks.map((item, index) => (
                        <tr className={styles.contentTR} key={index}>
                            <td style={{ width: '44px' }}>
                                <Typography className={styles.titleId} variant="caption"  >
                                    {index + 1}
                                </Typography>

                                {player.isPlayingData.tipo == 'Playlist' && player.isPlayingData.id == idPlaylist && player.isPlayingMusic === index && !player.pause ?
                                    <PauseOutlined
                                        className={`${styles.titleActionMusic} ${styles.iconPause}`}
                                        onClick={handleStopMusic}
                                    />
                                    :
                                    <PlayArrowIcon
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setTrack(index)}
                                        className={styles.titleActionMusic}
                                    />
                                }
                            </td>
                            <td className={styles.titleTH}>
                                <Avatar
                                    shape='square'
                                    size={40}
                                    src={item.avatar}
                                />

                                <div className={styles.titleNames}>
                                    <Typography
                                        className={player.isPlayingData.tipo == 'Playlist' && player.isPlayingData.id == idPlaylist && player.isPlayingMusic === index ?
                                            styles.activeMusic : ''}
                                        variant="caption"
                                    >
                                        {item.name}
                                    </Typography>

                                    <small>
                                        {item.author}
                                    </small>
                                </div>
                            </td>
                            <td>
                                <Popconfirm
                                    title="Remover está música da playlist?"
                                    onConfirm={() => deleteMusic(item.id, index)}
                                    okText="Sim"
                                    cancelText="Não"
                                >
                                    <DeleteOutlined className={styles.deleteIcon} />
                                </Popconfirm>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}