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

type Props = {
    data: MyPlaylist
}

const MyPlaylist = ({ data }: Props) => {
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
            <Backdrop sx={{ color: '#fff' }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <header id={styles.header}>
                <EditPlaylist id={router.query.id != undefined ? +router.query.id : 0} data={data} />
            </header>

            <div id={styles.body}>
                {data.playlist?.musics != undefined && data.playlist?.musics.length <= 0 ?
                    <div style={{ display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                        <Typography variant='overline'> Não há músicas nesta playlist </Typography>
                    </div>
                    :
                    <div style={{ padding: '0 10px', marginTop: 5 }}>
                        <TablePlaylist setLoading={setLoading} idPlaylist={router.query.id != undefined ? +router.query.id : 0} rows={data.playlist != undefined ? data.playlist?.musics : []} />
                    </div>
                }
            </div>
        </>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { id } = context.query;
    const data: MyPlaylist = await api(`playlist/${id}`, 'get', {}, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjUwOTI1MjU0LCJuYmYiOjE2NTA5MjUyNTQsImp0aSI6Im1QVzBNbUhCb21MbTFhS2siLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.h8b99aiGXJG8jMvKuiN-ZODj4hCbtYubCq7QP0PcS3I');

    return {
        props: {
            data: data
        }
    }
}

export default MyPlaylist;