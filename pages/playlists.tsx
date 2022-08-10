import styles from '../styles/playlists.module.css';
import { Avatar, Typography } from 'antd';
import * as React from 'react';
import { useRouter } from 'next/router';
import { api } from '../libs/api';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from '@mui/material';
import { Music } from '../libs/types/Music';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPlayingData, setIsPlayingMusic, setPlayList } from '../libs/redux/reducers/playerReducer';
import { RootState } from '../libs/redux/store';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { User } from '../libs/types/AuthUser';
import { setReloadPlaylists } from '../libs/redux/reducers/clientInfosReducer';
import { Playlist } from '../libs/types/MyPlaylist';

type ApiProps = {
    error: string,
    playlist: Music[]
}

type Props = {
    user: User
}

const Playlists = ({ user }: Props) => {
    const { Text } = Typography;

    const dispatch = useDispatch();
    const player = useSelector((state: RootState) => state.player);
    const infos = useSelector((state: RootState) => state.clientInfos);
    
    const router = useRouter();


    const [loading, setLoading] = React.useState(false); 

    //New playlist
    const newPlaylist = async () => {
        setLoading(true);
        const data = await api('playlist/new', 'post', {}, user.jwt);

        router.push(`playlist/${data.id}`);
        setLoading(false)

        dispatch(setReloadPlaylists(true))
    }

    const goToPlaylist = async (id: number) => {
        router.push(`playlist/${id}`);
    }

    const playTracks = (item: Playlist) => {
        if (item.musics != undefined) {
            dispatch(setPlayList(item.musics));
        }

        dispatch(setIsPlayingMusic(0));
        dispatch(setIsPlayingData({
            id: item.id,
            tipo: 'Playlist'
        }))
    }


    return (
        <>
            <Backdrop sx={{ color: '#fff' }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <div style={{ margin: '0 30px' }}>
                <div className={styles.contentHeader}>
                    <div style={{ flex: 1, alignSelf: 'flex-end' }}>
                        <Text style={{ fontSize: '24px', color: 'white' }} strong>Minhas playlists</Text>
                    </div>

                    <button
                        onClick={newPlaylist}
                        className={styles.contentHeaderButton}
                        disabled={loading}
                    >
                        Criar uma playlist
                    </button>
                </div>

                <div className={styles.contentBody}>
                    <div className={styles.contentListPlaylist}>
                        {infos.playlists.map((item, index) => (
                            <div key={index} className={styles.playlist}>
                                <Avatar className={styles.playlistAvatar} src={item.avatar} />

                                <div hidden={player.isPlayingData.id == item.id && player.isPlayingData.tipo == 'Playlist' ? true : false} className={styles.playlistPlayButton}>
                                    <button disabled={loading} onClick={() => playTracks(item)}>
                                        <PlayArrowIcon />
                                    </button>
                                </div>
                                <Text onClick={() => goToPlaylist(item.id)} className={`${styles.playlistName} ${player.isPlayingData.id == item.id && player.isPlayingData.tipo == 'Playlist' ? styles.activePlaylist : ''}`} strong>{item.name}</Text>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Playlists;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(
        context.req, context.res, authOptions
    )
    if (!session) return { redirect: { destination: '/login', permanent: true } }

    return {
        props: {
            user: session.user,
        }
    }
}






