import { LinearProgress } from '@mui/material';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { SearchInput } from '../components/SearchInput/SearchInput';
import Table from '../components/Table';
import { api } from '../libs/api';
import { RootState } from '../libs/redux/store';
import { Music } from '../libs/types/Music';
import { SearchAll } from '../libs/types/Search';
import styles from '../styles/Search.module.css';
import { Pagination } from 'antd';
import { setPage } from '../libs/redux/reducers/paginationReducer';
import { useRouter } from 'next/router';

const Search = () => {
    const pagination = useSelector((state: RootState) => state.pagination);

    const router = useRouter()
    const dispatch = useDispatch()

    const { Text } = Typography;

    const [list, setList] = useState<Music[]>([]);
    const [countList, setCountList] = useState(0);
    const [loading, setLoading] = useState(false);

    const getList = async (search: string) => {
        setLoading(true);

        const limit = 30;
        let offset = (pagination.page - 1) * limit;

        if (pagination.page == 1) offset = 0;

        let json: SearchAll = await api('search', 'get', `limit=${limit}&offset=${offset}&query=${search}`);
        setList(json.data);
        setCountList(json.count);

        setLoading(false);
    }

    const handleChangePaginate = (pageNumber: number) => {
        dispatch(setPage(pageNumber));
    }

    const serachGenre = (search: string) => {
        router.push('/search', {
            query: {
                query: search
            }
        })
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (params.has('query') && params.get('query') != '') {
            getList(params.get('query') as string);
        } else {
            setList([])
            setCountList(0)
        }
    }, [pagination.page, router.query]);

    return (
        <div className={styles.container}>
            <div hidden={!loading} style={{ margin: '5px 0 20px 0' }}>
                <LinearProgress color="success" />
            </div>


            <Row className="mt-3 mb-4">
                <Text className={styles.textSearch} strong>Pesquisar por músicas e playlists</Text>

                <SearchInput />

                <div className="mt-4" hidden={list.length < 1}>
                    <Table rowsCount={countList} rows={list} />
                </div>
            </Row>

            <Row className={styles.rowGenre} hidden={list.length > 1}>
                <div className={styles.gridGenres}>
                    <div
                        onClick={() => serachGenre('Internacional')}
                        className={`${styles.genre} ${styles.genrePurple}`}
                    >
                        <Text className={styles.textGenre} strong>Eletrônicas / Internacionais</Text>
                    </div>

                    <div
                        onClick={() => serachGenre('Nacional')} 
                        className={`${styles.genre} ${styles.genreGreen}`}
                    >
                        <Text className={styles.textGenre} strong>Eletrônicas / Nacionais</Text>
                    </div>

                    <div
                        onClick={() => serachGenre('Samba')}
                        className={`${styles.genre} ${styles.genreBlue}`}
                    >
                        <Text className={styles.textGenre} strong>Sambas</Text>
                    </div>

                    <div
                        onClick={() => serachGenre('Pagode')}
                        className={`${styles.genre} ${styles.genreBrown}`}
                    >
                        <Text className={styles.textGenre} strong>Pagodes</Text>
                    </div>

                    <div
                        onClick={() => serachGenre('Trap')}
                        className={`${styles.genre} ${styles.genreAqua}`}
                    >
                        <Text className={styles.textGenre} strong>Traps</Text>
                    </div>

                    <div
                        onClick={() => serachGenre('Música Ambiente')}
                        className={`${styles.genre} ${styles.genreRed}`}
                    >
                        <Text className={styles.textGenre} strong>Músicas ambientes</Text>
                    </div>

                    <div
                        onClick={() => serachGenre('Mpb')}
                        className={`${styles.genre} ${styles.genrePink}`}
                    >
                        <Text className={styles.textGenre} strong>Mpbs</Text>
                    </div>

                    <div
                        onClick={() => serachGenre('Jazz')}
                        className={`${styles.genre} ${styles.genreOrange}`}
                    >
                        <Text className={styles.textGenre} strong>Jazz</Text>
                    </div>

                    <div
                        onClick={() => serachGenre('Umbanda')}
                        className={`${styles.genre} ${styles.genreGray}`}
                    >
                        <Text className={styles.textGenre} strong>Umbanda</Text>
                    </div>

                    <div
                        onClick={() => serachGenre('Internacional')}
                        className={`${styles.genre} ${styles.genreHightBlue}`}
                    >
                        <Text className={styles.textGenre} strong>Festa</Text>
                    </div>
                </div>
            </Row>

            <Pagination
                style={{ marginTop: '20px' }}
                defaultPageSize={30}
                current={pagination.page}
                onChange={handleChangePaginate}
                total={countList}
                hideOnSinglePage
            />
        </div>
    )
}


export default Search;