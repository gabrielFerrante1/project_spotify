import { Typography, CircularProgress } from "@mui/material";
import { Avatar } from "antd";
import { MyPlaylist } from "../../libs/types/MyPlaylist"
import styles from './EditPlaylist.module.css';
import { useEffect, useState } from "react";
import { api } from '../../libs/api';
import Backdrop from '@mui/material/Backdrop';
import EditAvatar from "./EditPlaylistAvatar";
import EditName from "./EditPlaylistName";
import EditPrivacy from "./EditPlaylistPrivacy";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setReloadPlaylists } from "../../libs/redux/reducers/clientInfosReducer";

type Props = {
    data: MyPlaylist
}

export default ({ data }: Props) => {
    const dispatch = useDispatch()

    const { data: sessionClient } = useSession();

    const router = useRouter();
    const { id } = router.query;

    const [dataPlaylist, setDataPlaylist] = useState(data);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (edit) {
            const exec = async () => {
                setLoading(true);
                setDataPlaylist(await api(`playlist/${id}`, 'get', {}, sessionClient?.user.jwt));
                setLoading(false);
            };

            exec();

            dispatch(setReloadPlaylists(true))
        }

        setDataPlaylist(data)
    }, [edit, data]);

    return (
        <div className={styles.content}>
            <Backdrop className="text-white" open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className={styles.contentAvatar}>
                <Avatar
                    shape="square"
                    size={140}
                    src={dataPlaylist?.playlist?.avatar}
                    className={styles.avatar}
                />

                <div className={styles.uploadAvatar}>
                    <EditAvatar
                        id={id as string}
                        setEdit={setEdit}
                        userJwt={sessionClient?.user.jwt as string}
                    />
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
                    setEdit={setEdit}
                    userJwt={sessionClient?.user.jwt as string}
                />

                {dataPlaylist?.playlist != undefined ?
                    <EditPrivacy
                        id={id as string}
                        playlistPrivacy={dataPlaylist?.playlist?.privacy}
                        setEdit={setEdit}
                        userJwt={sessionClient?.user.jwt as string}
                    />
                    : ''}
            </div>
        </div>
    )
}