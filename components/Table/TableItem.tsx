import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Typography } from '@mui/material';
import { Avatar } from 'antd';
import { useSelector } from "react-redux";
import { RootState } from '../../libs/redux/store';
import { Playlist } from "../../libs/types/Playlist";
import styles from './Table.module.css';

type Props = {
    index: number,
    item: Playlist,
    onClick: () => void
}

export default ({ index, item, onClick }: Props) => {
    const player = useSelector((state: RootState) => state.player);

    const conditionPlayButton = player.isPlayingData.id == item.id && player.isPlayingData.tipo == item.tipo;

    return (
        <tr className={styles.contentTR}>
            <td style={{ width: '44px' }}>
                <Typography className={styles.titleId} variant="caption">
                    {index + 1}
                </Typography>

                <PlayArrowIcon
                    onClick={onClick}
                    style={{ cursor: 'pointer' }}
                    className={conditionPlayButton ? 'd-none' : styles.titleActionMusic}
                />
            </td>
            <td className={styles.titleTH}>
                <Avatar
                    shape='square'
                    size={40}
                    src={item.avatar}
                />

                <div className={styles.titleNames}>
                    <Typography
                        className={player.isPlayingData.id == item.id && player.isPlayingData.tipo == item.tipo ?
                            styles.activeMusic : ''}
                        variant="caption"
                    >
                        {item.name}
                    </Typography>

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