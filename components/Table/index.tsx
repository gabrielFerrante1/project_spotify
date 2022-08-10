import { Typography } from '@mui/material'; 
import * as React from 'react';
import { Music } from '../../libs/types/Music';
import styles from './Table.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../libs/redux/store';
import { setIsPlayingData, setIsPlayingMusic, setPause, setPlayList, setResetAudioOnAlterationPlaylist } from '../../libs/redux/reducers/playerReducer'; 
import TableItem from './TableItem';

type Props = {
    rows: Music[],
    rowsCount: number
}

export default function Table({ rows, rowsCount }: Props) {
    const player = useSelector((state: RootState) => state.player); 
 
    const dispatch = useDispatch();

    const [list, setList] = React.useState<Music[]>(rows)
    const [listCount, setListCount] = React.useState(rowsCount);

    const setTracks = (item: Music) => {
        dispatch(setPause(false))

        if (item.tipo == 'Música') {
            if (player.isPlayingData.tipo == 'Música' && player.isPlayingData.id == item.id) {
                dispatch(setResetAudioOnAlterationPlaylist(false))

                return;
            } else {
                dispatch(setResetAudioOnAlterationPlaylist(true))
            }


            dispatch(setPlayList([
                item
            ]));

            dispatch(setIsPlayingMusic(0));

            dispatch(setIsPlayingData({
                id: item.id,
                tipo: item.tipo
            }));

        } else if (item.tipo == 'Playlist') {
            if (player.isPlayingData.tipo == 'Playlist' && player.isPlayingData.id == item.id) {
                dispatch(setResetAudioOnAlterationPlaylist(false))

                return;
            } else {
                dispatch(setResetAudioOnAlterationPlaylist(true))
            }


            if (item.musics != undefined) {
                dispatch(setPlayList(
                    item.musics
                ));
            }

            dispatch(setIsPlayingMusic(0));

            dispatch(setIsPlayingData({
                id: item.id,
                tipo: item.tipo
            }));
        }
    }
 

    React.useEffect(() => {
        setList(rows)
        setListCount(rowsCount);
    }, [rows]);

    return (
        <div>
            <table className={styles.tableTracks}>
                <thead>
                    <tr>
                        <th>
                            <Typography variant="overline" style={{ paddingLeft: '10px' }}>
                                #
                            </Typography>
                        </th>
                        <th>
                            <Typography variant="overline" style={{ paddingLeft: '10px' }}>
                                Título
                            </Typography>
                        </th>
                        <th>
                            <Typography variant="overline">
                                Tipo
                            </Typography>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {list.map((item, index) => (
                        <TableItem
                            onClick={() => setTracks(item)}
                            item={item}
                            index={index}
                            key={index}
                        />
                    ))}
                </tbody>
            </table> 
        </div>
    );
}