import { LinearProgress, Typography } from '@mui/material'; 
import { Avatar, Pagination } from 'antd';
import * as React from 'react';
import { Playlist } from '../../types/Playlist';
import styles from './Table.module.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setIsPlayingData, setIsPlayingTrack, setPlayList } from '../../redux/reducers/playerReducer';
import { useRouter } from 'next/router';
import { setPage } from '../../redux/reducers/paginationReducer';

type Props = {
  rows: Playlist[],
  rowsCount: number,
  loading: boolean 
}

export default function Table({rows, rowsCount, loading}: Props) {
  const player = useSelector((state: RootState) => state.player);
  const pagination = useSelector((state: RootState) => state.pagination);

  const dispatch = useDispatch();
  const router = useRouter();

  const [list, setList] = React.useState<Playlist[]>(rows)  
  const [listCount, setListCount] = React.useState(rowsCount);

  const setTracks = (item: Playlist) => {
     if(item.tipo == 'Música') {
        dispatch(setPlayList([
          item
        ])); 

        dispatch(setIsPlayingTrack(0)); 
      
        dispatch(setIsPlayingData({
          id: item.id,
          tipo: item.tipo
        })); 
     } else if(item.tipo == 'Playlist') {
        if(item.musics != undefined) {
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
     dispatch( setPage(pageNumber) );
  }

  React.useEffect(()=>{
      let query: string = '';
      if(router.query.query != undefined) query = router.query.query.toString().toLowerCase();
    
      const result = rows.filter((value) => {
        const valueLower = value.name.toLowerCase();

          if ( ( query != '' ? valueLower.indexOf(query) != -1 : true ) ) {
              return value;
          } 
      });
     
      setList(result);

      if(query != '') {
        setListCount(result.length);
      } else {
        setListCount(rowsCount);
      }
      
  }, [router.query, loading]);

  React.useEffect(()=>{
    setListCount(rowsCount)
  }, [loading]);


  return (
    <div>
       <div hidden={!loading} style={{margin:'5px 0 20px 0'}}>
          <LinearProgress color="success" />
       </div>
      
        
        <table className={styles.tableTracks}>
            <thead>
              <tr>
                <th>
                    <Typography variant="overline" style={{paddingLeft:'10px'}}>
                      #
                    </Typography>
                </th> 
                <th>
                    <Typography variant="overline"  style={{paddingLeft:'10px'}}>
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
                  <tr className={styles.contentTR} key={index}>
                      <td style={{width:'44px'}}>
                          <Typography className={styles.titleId} variant="caption"  >
                                  {index+1}
                          </Typography>

                          <PlayArrowIcon
                              style={{cursor:'pointer'}}
                              onClick={()=>setTracks(item)}
                              className={player.isPlayingData.id === item.id && player.isPlayingData.tipo === item.tipo ? 'd-none' : styles.titleActionMusic}
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
                                  className={player.isPlayingData.id === item.id && player.isPlayingData.tipo === item.tipo ? 
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
                          <small style={{color:'WindowFrame'}}>
                              {item.tipo}
                          </small>
                      </td>  
                  </tr> 
                ))} 
            </tbody>
        </table>

        <Pagination 
              style={{marginTop:'20px' }}
              defaultPageSize={15}
              current={pagination.page}
              onChange={handleChangePaginate}
              total={listCount as number}
              hideOnSinglePage
        />
    </div>
  );
}