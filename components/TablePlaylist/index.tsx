import { Typography } from '@mui/material'; 
import { Avatar, Popconfirm, message } from 'antd';
import * as React from 'react';
import { Playlist } from '../../types/Playlist';
import styles from './TablePlaylist.module.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setIsPlayingTrack, setPlayList, setResetAudioOnAlterationPlaylist } from '../../redux/reducers/playerReducer'; 
import { DeleteOutlined } from '@ant-design/icons';
import { api } from '../../utils/api';
import { MyPlaylist } from '../../types/MyPlaylist';

type Props = {
  rows: Playlist[],
  idPlaylist: number,
  setLoading: (a: boolean) => void
}

export default function TablePlaylist({rows, idPlaylist, setLoading}: Props) {
  const player = useSelector((state: RootState) => state.player);

  const dispatch = useDispatch();

  const [tracks, setTracks] = React.useState<Playlist[]>(rows);

  const setTrack = (index: number) => { 
        dispatch(setPlayList(
            tracks
        ));

        dispatch(setIsPlayingTrack(index));
  }

  const deleteMusic = async (id: number, index: number) => {
        setLoading(true);
        await api(`playlist`, 'delete', {id_music: id, id_playlist: idPlaylist}, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjUwOTI1MjU0LCJuYmYiOjE2NTA5MjUyNTQsImp0aSI6Im1QVzBNbUhCb21MbTFhS2siLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.h8b99aiGXJG8jMvKuiN-ZODj4hCbtYubCq7QP0PcS3I');
    
        message.success('Música removida com sucesso');

        const data: MyPlaylist = await api(`playlist/${idPlaylist}`, 'get', {}, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjUwOTI1MjU0LCJuYmYiOjE2NTA5MjUyNTQsImp0aSI6Im1QVzBNbUhCb21MbTFhS2siLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.h8b99aiGXJG8jMvKuiN-ZODj4hCbtYubCq7QP0PcS3I');

        if (data.playlist != undefined) {
            setTracks(data.playlist.musics);

            if(index <= player.isPlaying) {
              dispatch(setPlayList([]));
              dispatch(setIsPlayingTrack(-1)); 
            } else {
              dispatch(setResetAudioOnAlterationPlaylist(false)); 
              dispatch(setPlayList(data.playlist.musics));
            }
        }

        setLoading(false);
    }

  return (
    <div> 
        <table className={styles.tableTracks}>
            <thead>
              <tr> 
              </tr>
            </thead>

            <tbody>
              {tracks.map((item, index) => ( 
                  <tr className={styles.contentTR} key={index}>
                      <td style={{width:'44px'}}>
                          <Typography className={styles.titleId} variant="caption"  >
                                  {index+1}
                          </Typography>

                          <PlayArrowIcon
                              style={{cursor:'pointer'}}
                              onClick={()=>setTrack(index)}
                              className={ player.isPlaying === index    ? 'd-none' : styles.titleActionMusic}
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
                                  className={ player.isPlaying === index ? 
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
                        <Popconfirm
                                title="Remover está música da playlist?"
                                onConfirm={()=>deleteMusic(item.id, index)} 
                                okText="Sim"
                                cancelText="Não"
                        >
                                <DeleteOutlined style={{fontSize:17,color:'white'}} />
                        </Popconfirm> 
                      </td>  
                  </tr> 
                ))} 
            </tbody>
        </table> 
    </div>
  );
}