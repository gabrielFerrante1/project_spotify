import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import Table from '../components/Table';
import { Row } from 'react-bootstrap'; 
import { SearchInput } from '../components/SearchInput/SearchInput';
import { useApi } from '../utils/api';
import { Playlist } from '../types/Playlist'; 
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; 

type PropsJson = {
  data: Playlist[],
  count: number
}

const Search = () => {
  const pagination = useSelector((state: RootState)=>state.pagination);
  const { Text } = Typography;

  const [list, setList] = useState<Playlist[]>([]);
  const [countList, setCountList] = useState(0);
  const [loading, setLoading] = useState(true);
 
  const getList = async () => {
    setLoading(true);
  
    const limit = 15;
    let offset = (pagination.page - 1)  * limit;
  
    if(pagination.page == 1) offset = 0; 
  
    let json: PropsJson = await useApi('search', 'get', `limit=${limit}&offset=${offset}`);
    setList(json.data);
    setCountList(json.count);

    setLoading(false); 
  }
 
  useEffect(()=>{
    getList();
  }, [pagination.page]);

  return ( 
      <div style={{margin:'0 30px'}}> 
        <Row className="mt-3 mb-4">
            <Text style={{fontSize:'24px',marginBottom:'7px',color:'white'}} strong>Pesquisar por músicas e playlists</Text>
      
            <SearchInput  />
 
            <div className="mt-4"> 
              <Table loading={loading} rowsCount={countList} rows={list} /> 
            </div>
        </Row>
      </div>
  )
}
 

export default Search;
