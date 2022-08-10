import { CircularProgress, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MyPlaylist } from "../../libs/types/MyPlaylist";
import { api } from '../../libs/api';
import styles from '../../styles/PlaylistID.module.css';
import EditPlaylist from '../../components/EditPlaylist';
import TablePlaylist from '../../components/TablePlaylist';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { User } from '../../libs/types/AuthUser';

type Props = {
    data: MyPlaylist,
    user: User
}

const MyPlaylist = ({ data, user }: Props) => { 
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data.error != '') {
            router.push('/');
        } else {
            setLoading(false);
        }

    }, []);

    return (
        <>
            <Backdrop className='text-white' open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <header id={styles.header}>
                <EditPlaylist data={data} />
            </header>

            <div id={styles.body}>
                {data.playlist?.musics != undefined && data.playlist?.musics.length <= 0 ?
                    <div className={styles.notFoundMusics}>
                        <Typography variant='overline'> Não há músicas nesta playlist </Typography>
                    </div>
                    :
                    <div className={styles.listMusics}>
                        <TablePlaylist
                            setLoading={setLoading}
                            idPlaylist={router.query.id != undefined ? +router.query.id : 0}
                            rows={data.playlist != undefined ? data.playlist?.musics : []}
                            userJwt={user.jwt}
                        />
                    </div>
                }
            </div>
        </>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    // Check if the user is logged in
    const session = await unstable_getServerSession(
        context.req, context.res, authOptions
    )
    if (!session) return { redirect: { destination: '/login', permanent: true } }
    const user = session.user

    const { id } = context.query;
    const data: MyPlaylist = await api(`playlist/${id}`, 'get', {}, user.jwt);

    return {
        props: {
            data: data,
            user: user
        }
    }
}

export default MyPlaylist;