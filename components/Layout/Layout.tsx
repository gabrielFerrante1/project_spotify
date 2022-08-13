import { ReactElement, useEffect } from 'react';
import { Player } from '../Player/Player';

import styles from './Layout.module.css';

import {
    Divider
} from 'antd';

import {
    Container
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../libs/redux/store';
import { setIsPlayingData, setIsPlayingMusic, setPause, setPlayList, setViewPlaylist } from '../../libs/redux/reducers/playerReducer';
import MusicsPlaylist from '../MusicsPlaylist';
import Head from 'next/head';
import ItemNav from './ItemNav';
import { signIn, useSession } from 'next-auth/react';
import { MyPlaylists, Playlist } from '../../libs/types/MyPlaylist';
import { setInfosPlaylists, setReloadPlaylists } from '../../libs/redux/reducers/clientInfosReducer';
import { api } from '../../libs/api';
import ListMyPlaylists from './MyPlaylists';
import { LastMusic } from '../../libs/types/Music';

//Types desse componente
type Props = {
    children: ReactElement
}

export const Layout = ({ children }: Props) => {
    const { data: sessionClient, status: statusClient } = useSession()

    const infos = useSelector((state: RootState) => state.clientInfos)
    const player = useSelector((state: RootState) => state.player);
    const dispatch = useDispatch();

    useEffect(() => {
        if (player.playlist.length <= 1) {
            dispatch(setViewPlaylist(false))
        }
    }, [player.playlist]);

    const getPlaylists = async () => {
        const data: MyPlaylists = await api('playlist', 'get', {}, sessionClient?.user.jwt);
        dispatch(setInfosPlaylists(data.playlist))

        if (player.isPlayingData.tipo == 'Playlist' && player.playlist.length >= 1) { 
            const musics = data.playlist.find(playlist => playlist.id == player.isPlayingData.id)

           
            if (musics != undefined) dispatch(setPlayList(musics.musics)) 
        }
 
    }

    const getLastMusic = async () => {
        const data: LastMusic = await api('music-heard', 'get', {}, sessionClient?.user.jwt);

        if (data.error === '') {
            dispatch(setPlayList([data.music]))
            dispatch(setIsPlayingMusic(0))
            dispatch(setIsPlayingData({
                id: data.music.id,
                tipo: 'Música'
            }));
        }
    }

    useEffect(() => {
        if (sessionClient && infos.playlists.length == 0 || infos.reloadPlaylists) {
            dispatch(setReloadPlaylists(false))
            getPlaylists();
        }
    }, [statusClient, infos.reloadPlaylists]);

    useEffect(() => { 
        if (sessionClient) {
            getLastMusic();
        }
    }, [statusClient]);

    return (
        <div className={styles.app}>
            <Head>
                <title>Spotify</title>
                <link rel='icon' href='https://logopng.com.br/logos/spotify-149.png' />
            </Head>

            <section className={styles.appLeftBar}>
                <div className={styles.appLeftBarDivUl}>
                    <ul>
                        <ItemNav
                            label='Home'
                            url='/'
                        />

                        <ItemNav
                            label='Buscar'
                            url='/search'
                        />

                        <ItemNav
                            label='Suas playlists'
                            url='/playlists'
                        />
                    </ul>

                    <Divider dashed className={styles.appDivider} />

                    {statusClient != 'loading' && statusClient == 'unauthenticated' ?
                        <button onClick={() => signIn()} className={styles.appBtnLogIn}>Fazer login</button>
                        :
                        <div className={styles.containerMyPlaylists}>
                            <ListMyPlaylists />
                        </div>
                    }
                </div>
            </section>

            <div className={styles.containerAppPages}>
                <section className={styles.appPages}>
                    {children}
                </section>
            </div>

            <section
                style={{ width: player.viewPlaylist ? '470px' : 0 }}
                className={styles.appViewPlaylist}
            >
                <Container className={styles.containerMusicsPlaylist}>
                    <MusicsPlaylist />
                </Container>
            </section>

            <section className={`${styles.appPlayer}`}>
                <Player />
            </section>
        </div>
    )
} 