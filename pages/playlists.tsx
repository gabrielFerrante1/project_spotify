import styles from '../styles/playlists.module.css';
import { Typography } from 'antd';
import * as React from 'react';
import { useRouter } from 'next/router';
import { api } from '../libs/api';
import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../libs/redux/store';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { User } from '../libs/types/AuthUser';
import { setReloadPlaylists } from '../libs/redux/reducers/clientInfosReducer';
import Playlist from '../components/Playlist';

type Props = {
    user: User
}

const Playlists = ({ user }: Props) => {
    const { Text } = Typography;

    const dispatch = useDispatch();
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
                            <Playlist
                                key={index}
                                item={item}
                            />
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