import { Typography } from "@mui/material";
import { Switch } from "antd";
import { api } from "../../libs/api";
import { PopoverGrf } from "../PopoverGrf";
import styles from './EditPlaylist.module.css';

type Props = {
    id: string,
    playlistPrivacy: number | undefined,
    userJwt: string;
    setEdit: (value: boolean) => void,
}

export default ({ id, playlistPrivacy, userJwt, setEdit }: Props) => {
    const editedPrivacy = async () => {
        setEdit(false);
        await api(`playlist/edit/${id}`, 'post', { privacy: true }, userJwt);
        setEdit(true);
    }

    return (
        <div className={styles.contentPrivacy}>
            <Typography variant="overline">
                <strong className={styles.contentPrivacyLabel} >Privacidade </strong>
            </Typography>

            <PopoverGrf
                title={playlistPrivacy == 1 ? 'Permitir que todos ouçem a playlist' : 'Não permitir que ninguém ouçe a playlist'}
            >
                <Switch onChange={editedPrivacy} defaultChecked={playlistPrivacy == 1 ? true : false} />
            </PopoverGrf>
        </div>
    )
}