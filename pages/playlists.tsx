import styles from '../styles/playlists.module.css';
import { Avatar, Typography } from 'antd'; 
import * as React from 'react';
import { useRouter } from 'next/router';
import { useApi } from '../utils/api'; 
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from '@mui/material'; 
import { Playlist } from '../types/Playlist';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPlayingData, setIsPlayingTrack, setPlayList } from '../redux/reducers/playerReducer';
import { RootState } from '../redux/store';

type ApiProps = {
    error: string,
    playlist: Playlist[]
}

const Playlists = () => {
    const { Text } = Typography;

    const player = useSelector((state: RootState) => state.player);
    const router = useRouter();
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(false);
    const [list, setList] = React.useState<Playlist[]>([]);

    //New playlist
    const newPlaylist = async () => {
        setLoading(true);
        const data = await useApi('playlist/new', 'post', {}, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjUwOTI1MjU0LCJuYmYiOjE2NTA5MjUyNTQsImp0aSI6Im1QVzBNbUhCb21MbTFhS2siLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.h8b99aiGXJG8jMvKuiN-ZODj4hCbtYubCq7QP0PcS3I');

        router.push(`playlist/${data.id}`);
        setLoading(false)
    }

    const goToPlaylist = async (id: number) => {
        router.push(`playlist/${id}`);
    }

    const playTracks = (item: Playlist) => {
        if(item.musics != undefined) {
            dispatch(setPlayList(item.musics));
        }
   
        dispatch(setIsPlayingTrack(0));
        dispatch(setIsPlayingData({
            id: item.id,
            tipo: 'Playlist'
        }))
    }

    React.useEffect(()=>{
        const getPlaylists = async () => {
            setLoading(true); 
            const data: ApiProps = await useApi('playlist', 'get', {}, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjUwOTI1MjU0LCJuYmYiOjE2NTA5MjUyNTQsImp0aSI6Im1QVzBNbUhCb21MbTFhS2siLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.h8b99aiGXJG8jMvKuiN-ZODj4hCbtYubCq7QP0PcS3I');
             
            if(data.playlist != undefined) { 
                setList(data.playlist); 
            }

            setLoading(false); 
        }

        getPlaylists();
    }, []);

    return (
        <>
            <Backdrop  sx={{ color: '#fff' }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        
            <div style={{margin:'0 30px'}}> 
                <div className={styles.contentHeader}>
                    <div style={{flex:1,alignSelf:'flex-end'}}>
                        <Text style={{fontSize:'24px',color:'white'}} strong>Minhas playlists</Text>
                    </div>
 
                    <button
                        onClick={newPlaylist}
                        className={styles.contentHeaderButton}
                        disabled={loading}
                    > 
                        Criar uma playlist
                    </button>
                </div>

                <div className={styles.contentBody}>
                    <div className={styles.contentListPlaylist}>
                        {list.map((item, index) => (  
                            <div key={index}  className={styles.playlist}> 
                                <Avatar className={styles.playlistAvatar} src={item.avatar}/> 
                               
                                <div hidden={player.isPlayingData.id == item.id && player.isPlayingData.tipo == 'Playlist' ? true : false} className={styles.playlistPlayButton}>
                                    <button disabled={loading} onClick={()=>playTracks(item)}>
                                        <PlayArrowIcon />
                                    </button> 
                                </div> 
                                <Text onClick={()=>goToPlaylist(item.id)} className={`${styles.playlistName} ${player.isPlayingData.id == item.id && player.isPlayingData.tipo == 'Playlist' ? styles.activePlaylist : ''}`} strong>{item.name}</Text>
                            </div>  
                        ))}
                    </div>
                </div> 
            </div>
        </>
    )
} 

export default Playlists;