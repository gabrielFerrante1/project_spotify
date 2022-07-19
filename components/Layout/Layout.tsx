import { ReactElement, useEffect } from 'react';
import { useRouter } from "next/router";
import { Player } from '../Player/Player';

import styles from './Layout.module.css';
import Typography from '@mui/material/Typography';

import {  
    Divider 
} from 'antd';

import {  
    Container 
} from 'react-bootstrap';

import {
    HomeOutlined,
    SearchOutlined,
    ProfileOutlined
} from '@ant-design/icons'; 
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; 
import { setViewPlaylist } from '../../redux/reducers/playerReducer';
import MusicsPlaylist from '../MusicsPlaylist';


//Types desse componente
type Props = {
    children: ReactElement
}

export const Layout = ({children}: Props) => {
    const player = useSelector((state: RootState) => state.player);
    const router = useRouter();
    const dispatch = useDispatch();

    const redirect = (url: string) => {
        router.push(url);
    }

    useEffect(()=>{
        if(player.playlist.length <= 1) {
            dispatch(setViewPlaylist(false))
        }
    }, [player.playlist]);

    return (
        <div className={styles.app}>
            <section className={styles.appLeftBar}> 
                <div className={styles.appLeftBarDivUl}>
                    <ul>
                        <li 
                            onClick={()=>redirect('/')}
                            className={`${styles.appLeftBarDivLiDiv} ${router.pathname == '/' && styles.activeRoute}`}
                        >
                            <HomeOutlined className={styles.appLeftBarIcons} /> 

                            <div style={{alignSelf:'center'}}>
                                <Typography className={styles.appLeftBarTexts} variant="h6" gutterBottom component="span">
                                    Home
                                </Typography>
                            </div>
                        </li>
                    
                        <li 
                            onClick={()=>redirect('/search')}  
                            className={`${styles.appLeftBarDivLiDiv} ${router.pathname == '/search' && styles.activeRoute}`}
                        >  
                            <SearchOutlined className={styles.appLeftBarIcons} /> 

                            <div style={{alignSelf:'center'}}>
                                <Typography className={styles.appLeftBarTexts} variant="h6" gutterBottom component="span">
                                    Buscar
                                </Typography>
                            </div> 
                        </li>

                        <li
                            onClick={()=>redirect('/playlists')}  
                            className={`${styles.appLeftBarDivLiDiv} ${router.pathname == '/playlists' && styles.activeRoute}`}
                        >  
                            <ProfileOutlined className={styles.appLeftBarIcons} /> 

                            <div style={{alignSelf:'center'}}>
                                <Typography className={styles.appLeftBarTexts} variant="h6" gutterBottom component="span">
                                    Suas playlists
                                </Typography>
                            </div> 
                        </li> 
                    </ul>

                    <Divider dashed style={{background:'gray',margin:0}} />
                </div>
            </section>
                
            <section className={styles.appPages}> 
                {children}
            </section>
 
            <section  style={{width:player.viewPlaylist ? '470px' : 0}} className={styles.appViewPlaylist}> 
                <Container style={{padding:'0 10px'}}>
                    <MusicsPlaylist />
                </Container>
            </section>
 
            <section  className={`${styles.appPlayer}`}> 
                <Player />
            </section> 
        </div>
    )
} 