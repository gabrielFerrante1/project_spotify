import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
import { Typography } from "@mui/material";
import { Input } from "antd";
import { ChangeEvent, useState } from 'react';
import { api } from '../../libs/api';
import styles from './EditPlaylist.module.css';

type Props = {
    id: string,
    playlistName: string | undefined,
    setEdit: (value: boolean) => void,
    userJwt: string;
}

export default ({ id, playlistName, userJwt, setEdit }: Props) => { 
    const [valueInputName, setValueInputName] = useState('');

    const editValueName = () => {
        if (playlistName != undefined) setValueInputName(playlistName);
    }

    const editedValueName = async () => {
        setEdit(false);
        await api(`playlist/edit/${id}`, 'post', { name: valueInputName }, userJwt);
        setEdit(true);

        setValueInputName('');
    }

    const handleChangeValueName = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInputName(e.target.value);
    }

    return (
        <div className={styles.contentInfoPlaylistName}>
            {valueInputName != '' ?
                <Input
                    size="large"
                    className={styles.inputName} 
                    value={valueInputName}
                    onChange={handleChangeValueName}
                />
                :
                <Typography variant="h4" gutterBottom component="h4">
                    <strong>{playlistName}</strong>
                </Typography>
            }

            <div>
                {valueInputName != '' ?
                    <CheckCircleOutlined onClick={editedValueName} className={styles.InputIcons} />
                    :
                    <EditOutlined onClick={editValueName} className={styles.InputIcons} />
                }
            </div>
        </div>
    )
}