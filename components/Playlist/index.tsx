import { Avatar, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setIsPlayingData, setIsPlayingMusic, setPause, setPlayList, setResetAudioOnAlterationPlaylist } from '../../libs/redux/reducers/playerReducer';
import { RootState } from '../../libs/redux/store';
import { Playlist } from '../../libs/types/MyPlaylist';
import styles from './Playlist.module.css'

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useRouter } from 'next/router';
import { PauseOutlined } from '@ant-design/icons';

type Props = {
    item: Playlist
}

const { Text } = Typography;

const OnePlaylist = ({ item }: Props) => {
    const player = useSelector((state: RootState) => state.player);

    const dispatch = useDispatch();
    const router = useRouter()

    const conditionPlayButton = player.isPlayingData.tipo == 'Playlist' && player.isPlayingData.id == item.id

    const goToPlaylist = async (id: number) => router.push(`playlist/${id}`);

    const playTracks = (item: Playlist) => {
        if (player.isPlayingData.tipo == 'Playlist' && player.isPlayingData.id == item.id) {
            dispatch(setPause(!player.pause))
            dispatch(setResetAudioOnAlterationPlaylist(false))

            return;
        } else {
            dispatch(setResetAudioOnAlterationPlaylist(true))
        }


        if (item.musics != undefined) {
            dispatch(setPlayList(
                item.musics
            ));
        }

        dispatch(setIsPlayingMusic(0));

        dispatch(setIsPlayingData({
            id: item.id,
            tipo: 'Playlist'
        }));
    }


    return (
        <div className={styles.playlist}>
            <Avatar className={styles.playlistAvatar} src={item.avatar} />

            <div className={styles.playlistTogglePlayButton}>
                {conditionPlayButton && !player.pause ?
                    <button onClick={() => playTracks(item)}>
                        <PauseOutlined
                            className={styles.iconPause}
                        />
                    </button>
                    :
                    <button onClick={() => playTracks(item)}>
                        <PlayArrowIcon />
                    </button>
                }
            </div>
            <Text onClick={() => goToPlaylist(item.id)} className={`${styles.playlistName} ${player.isPlayingData.id == item.id && player.isPlayingData.tipo == 'Playlist' ? styles.activePlaylist : ''}`} strong>{item.name}</Text>
        </div>
    )
}

export default OnePlaylist;