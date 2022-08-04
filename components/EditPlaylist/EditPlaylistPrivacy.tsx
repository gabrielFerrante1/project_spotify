import { Typography } from "@mui/material";
import { Switch } from "antd";
import { api } from "../../utils/api";
import { PopoverGrf } from "../PopoverGrf";
import styles from './EditPlaylist.module.css';

type Props = {
    id: string,
    playlistPrivacy: number | undefined,
    setEdit: (value: boolean) => void,
}

export default ({ id, playlistPrivacy, setEdit }: Props) => {
    const editedPrivacy = async () => {
        setEdit(false);
        await api(`playlist/edit/${id}`, 'post', { privacy: true }, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjUwOTI1MjU0LCJuYmYiOjE2NTA5MjUyNTQsImp0aSI6Im1QVzBNbUhCb21MbTFhS2siLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.h8b99aiGXJG8jMvKuiN-ZODj4hCbtYubCq7QP0PcS3I');
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