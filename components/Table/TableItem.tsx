import { PauseOutlined } from '@ant-design/icons';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Typography } from '@mui/material';
import { Avatar } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { setPause } from '../../libs/redux/reducers/playerReducer';
import { RootState } from '../../libs/redux/store';
import { Music } from "../../libs/types/Music";
import AddOnPlaylist from '../AddOnPlaylist';
import styles from './Table.module.css';

type Props = {
    index: number,
    item: Music,
    onClick: () => void
}

export default ({ index, item, onClick }: Props) => {
    const dispatch = useDispatch()
    const player = useSelector((state: RootState) => state.player);

    const conditionPlayButton = player.isPlayingData.id == item.id && player.isPlayingData.tipo == item.tipo;

    const handleStopMusic = () => dispatch(setPause(true))

    return (
        <tr className={styles.contentTR}>
            <td style={{ width: '44px' }}>
                <Typography className={styles.titleId} variant="caption">
                    {index + 1}
                </Typography>


                {conditionPlayButton && !player.pause ?
                    <PauseOutlined
                        className={`${styles.titleActionMusic} ${styles.iconPause}`}
                        onClick={handleStopMusic}
                    />
                    :
                    <PlayArrowIcon
                        style={{ cursor: 'pointer' }}
                        onClick={onClick}
                        className={styles.titleActionMusic}
                    />
                }
            </td>
            <td className={styles.titleTH}>
                <Avatar
                    shape='square'
                    size={40}
                    src={item.avatar}
                />

                <div className={styles.titleNames}>
                    <div className={styles.titleArea}>
                        <Typography
                            className={conditionPlayButton ?
                                styles.activeMusic : ''}
                            variant="caption"
                        >
                            {item.name}

                        </Typography>

                        {item.tipo == 'Música' &&
                            <div className={styles.addOnPlaylist}>
                                <AddOnPlaylist
                                    idMusic={item.id}
                                />
                            </div>
                        }
                    </div>


                    <small>
                        {item.author}
                    </small>
                </div>
            </td>
            <td>
                <small className='text-white'>
                    {item.tipo}
                </small>
            </td>
        </tr>
    )
}