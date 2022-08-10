import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import { Alert, Snackbar } from '@mui/material';
import Text from 'antd/lib/typography/Text';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../libs/api';
import { setReloadPlaylists } from '../../libs/redux/reducers/clientInfosReducer';
import { RootState } from '../../libs/redux/store';
import { ApiResponse } from '../../libs/types/Api';
import styles from './AddOnPlaylist.module.css';

type Props = {
    idMusic: number,
    anchor?: string
}


const AddOnPlaylist = ({ idMusic, anchor = 'right' }: Props) => {
    const { data: sessionClient, status: statusLoginClient } = useSession()

    const dispatch = useDispatch()
    const infos = useSelector((state: RootState) => state.clientInfos);

    const [openMenu, setOpenMenu] = useState(false);
    const [alert, setAlert] = useState('');

    const addMusicToPlaylist = async (id_playlist: number) => {
        const request: ApiResponse = await api(`playlist/${id_playlist}/add-music`, 'post', { id_music: idMusic }, sessionClient?.user.jwt);
        if (request.error != '') {
            setAlert(request.error);
        } else {
            dispatch(setReloadPlaylists(true))
            setAlert(`Música adicionada a playlist`);
        }
    }

    const handleToggleMenu = () => setOpenMenu(!openMenu)

    return (
        <>
            {statusLoginClient != 'loading' && statusLoginClient == 'authenticated' &&
                <PlaylistAddOutlinedIcon
                    className={styles.iconAdd}
                    onClick={handleToggleMenu}
                />
            }

          
            <Snackbar open={alert != ''} autoHideDuration={9000} onClose={() => setAlert('')}>
                <Alert className={styles.alertInfo} severity="info" icon={<ErrorOutlineIcon className='text-white' />}>
                    {alert}
                </Alert>
            </Snackbar>

            <div
                className={styles.containerMenu}
                hidden={!openMenu}
            >
                <div
                    className={`${styles.menu} ${anchor == 'right' ? styles.menuAnchorRight : ''}`}
                >
                    <Text className={styles.title}>Adicionar música a playlist: </Text>

                    <hr className={styles.divisor} />

                    <ul className={styles.menuItems}>
                        {infos.playlists.map((playlist, key) => (
                            <li key={key} onClick={() => addMusicToPlaylist(playlist.id)}>
                                {playlist.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default AddOnPlaylist;