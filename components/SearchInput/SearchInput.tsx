import styles from './SearchInput.module.css';

import {
    SearchOutlined,
    CloseOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';

export const SearchInput = () => {
    const [value, setValueInput] = useState('');

    const router = useRouter();

    const setQueryString = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.target.value);

        router.push({
            pathname: router.pathname,
            query: {
                query: e.target.value
            },

        }, undefined, { scroll: false });
    }

    const clearQueryString = () => {
        router.push({
            pathname: router.pathname
        });
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (params.has('query')) {
            setValueInput(params.get('query') as string);
        } else {
            setValueInput('');
        }
    }, [router.query])

    return (
        <div className={styles.searchInputContent}>
            <SearchOutlined className={styles.searchIcon} />

            <input
                value={value}
                onChange={setQueryString} placeholder='Pesquisar por músicas, playlists, genêros e autores'
                type="search"
            />

            <CloseOutlined onClick={clearQueryString} hidden={router.query.query == undefined || router.query.query == ''} className={styles.searchIcon} />
        </div>
    )
}