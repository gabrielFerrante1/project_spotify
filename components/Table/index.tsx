import { LinearProgress, Typography } from '@mui/material';
import { Avatar, Pagination } from 'antd';
import * as React from 'react';
import { Playlist } from '../../libs/types/Playlist';
import styles from './Table.module.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../libs/redux/store';
import { setIsPlayingData, setIsPlayingTrack, setPlayList } from '../../libs/redux/reducers/playerReducer';
import { useRouter } from 'next/router';
import { setPage } from '../../libs/redux/reducers/paginationReducer';
import TableItem from './TableItem';

type Props = {
    rows: Playlist[],
    rowsCount: number,
    loading: boolean
}

export default function Table({ rows, rowsCount, loading }: Props) {
    const player = useSelector((state: RootState) => state.player);
    const pagination = useSelector((state: RootState) => state.pagination);

    const dispatch = useDispatch();
    const router = useRouter();

    const [list, setList] = React.useState<Playlist[]>(rows)
    const [listCount, setListCount] = React.useState(rowsCount);

    const setTracks = (item: Playlist) => {
        if (item.tipo == 'Música') {
            dispatch(setPlayList([
                item
            ]));

            dispatch(setIsPlayingTrack(0));

            dispatch(setIsPlayingData({
                id: item.id,
                tipo: item.tipo
            }));
        } else if (item.tipo == 'Playlist') {
            if (item.musics != undefined) {
                dispatch(setPlayList(
                    item.musics
                ));
            }

            dispatch(setIsPlayingTrack(0));

            dispatch(setIsPlayingData({
                id: item.id,
                tipo: item.tipo
            }));
        }
    }

    const handleChangePaginate = (pageNumber: number) => {
        dispatch(setPage(pageNumber));
    }

    React.useEffect(() => {
        let query: string = '';
        if (router.query.query != undefined) query = router.query.query.toString().toLowerCase();

        const result = rows.filter((value) => {
            const valueLower = value.name.toLowerCase();

            if ((query != '' ? valueLower.indexOf(query) != -1 : true)) {
                return value;
            }
        });

        setList(result);

        if (query != '') {
            setListCount(result.length);
        } else {
            setListCount(rowsCount);
        }

    }, [router.query, loading]);

    React.useEffect(() => {
        setListCount(rowsCount)
    }, [loading]);


    return (
        <div>
            <div hidden={!loading} style={{ margin: '5px 0 20px 0' }}>
                <LinearProgress color="success" />
            </div>


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

            <Pagination
                style={{ marginTop: '20px' }}
                defaultPageSize={15}
                current={pagination.page}
                onChange={handleChangePaginate}
                total={listCount}
                hideOnSinglePage
            />
        </div>
    );
}