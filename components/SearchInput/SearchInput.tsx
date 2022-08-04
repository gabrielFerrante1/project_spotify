import styles from './SearchInput.module.css'; 

import { 
    SearchOutlined,
    CloseOutlined
} from '@ant-design/icons'; 
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react'; 

export const SearchInput = () => {
    const router = useRouter();

    const setQueryString = (e: ChangeEvent<HTMLInputElement>) => {
        router.push({
            pathname: router.pathname,
            query: {
                query: e.target.value
            },
            
        }, undefined, {scroll: false});
    }

    const clearQueryString = () => {
        router.push({
            pathname: router.pathname
        });
    }

    return (  
        <div className={styles.searchInputContent}>
            <SearchOutlined className={styles.searchIcon}/>
            
            <input 
                value={router.query.query != undefined ? router.query.query.toString() : ''}
                onChange={setQueryString} placeholder='Pesquisar por músicas e playlists' 
                type="search"
            />

            <CloseOutlined onClick={clearQueryString} hidden={router.query.query == undefined || router.query.query == ''} className={styles.searchIcon}/>
        </div>
    )
}