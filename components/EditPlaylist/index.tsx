import { Typography, CircularProgress } from "@mui/material";
import { Avatar} from "antd";
import { MyPlaylist } from "../../libs/types/MyPlaylist"
import styles from './EditPlaylist.module.css';
import { ChangeEvent, useEffect, useState } from "react";
import { api } from '../../libs/api';
import Backdrop from '@mui/material/Backdrop';
import EditAvatar from "./EditPlaylistAvatar";
import EditName from "./EditPlaylistName";
import EditPrivacy from "./EditPlaylistPrivacy";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

type Props = {
    data: MyPlaylist,
    id: number
}

export default ({ data }: Props) => {
    const router = useRouter();
    const { id } = router.query;

    const [dataPlaylist, setDataPlaylist] = useState(data);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (edit) {
            const exec = async () => {
                setLoading(true);
                setDataPlaylist(await api(`playlist/${id}`, 'get', {}, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjUwOTI1MjU0LCJuYmYiOjE2NTA5MjUyNTQsImp0aSI6Im1QVzBNbUhCb21MbTFhS2siLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.h8b99aiGXJG8jMvKuiN-ZODj4hCbtYubCq7QP0PcS3I'));
                setLoading(false);
            };
            exec();
        }
    }, [edit]);

    return (
        <div className={styles.content}>
            <Backdrop sx={{ color: '#fff' }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className={styles.contentAvatar}>
                <Avatar
                    shape="square"
                    size={140}
                    src={dataPlaylist?.playlist?.avatar}
                    className={styles.avatar} />

                <div className={styles.uploadAvatar}>
                    <EditAvatar
                        id={id as string}
                        setEdit={setEdit} />
                </div>
            </div>

            <div className={styles.contentInfoPlaylist}>
                <Typography variant="overline">
                    <strong className={styles.spanPlaylist}>
                        Playlist
                    </strong>
                </Typography>

                <EditName
                    id={id as string}
                    playlistName={dataPlaylist?.playlist?.name}
                    setEdit={setEdit} />

                {dataPlaylist?.playlist != undefined ?
                    <EditPrivacy
                        id={id as string}
                        playlistPrivacy={dataPlaylist?.playlist?.privacy}
                        setEdit={setEdit} />
                    : ''}
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id
    const data: MyPlaylist = await api(`playlist/${id}`, 'get', {}, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjUwOTI1MjU0LCJuYmYiOjE2NTA5MjUyNTQsImp0aSI6Im1QVzBNbUhCb21MbTFhS2siLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.h8b99aiGXJG8jMvKuiN-ZODj4hCbtYubCq7QP0PcS3I');

    return {
        props: {
            data
        }
    }
}