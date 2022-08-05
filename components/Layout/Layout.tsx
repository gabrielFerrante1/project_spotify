import { ReactElement, useEffect } from 'react';
import { useRouter } from "next/router";
import { Player } from '../Player/Player';

import styles from './Layout.module.css';
import Typography from '@mui/material/Typography';

import {
    Divider
} from 'antd';

import {
    Container
} from 'react-bootstrap';
 
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../libs/redux/store';
import { setViewPlaylist } from '../../libs/redux/reducers/playerReducer';
import MusicsPlaylist from '../MusicsPlaylist'; 
import Head from 'next/head'; 
import ItemNav from './ItemNav';


//Types desse componente
type Props = {
    children: ReactElement
}

export const Layout = ({ children }: Props) => {
    const player = useSelector((state: RootState) => state.player);
    const router = useRouter();
    const dispatch = useDispatch();

    const redirect = (url: string) => {
        router.push(url);
    }

    useEffect(() => {
        if (player.playlist.length <= 1) {
            dispatch(setViewPlaylist(false))
        }
    }, [player.playlist]);

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
                </div>
            </section>

            <section className={styles.appPages}>
                {children}
            </section>

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