import { EditOutlined, UploadOutlined, CheckCircleOutlined} from "@ant-design/icons";
import { Typography, CircularProgress } from "@mui/material";
import { Avatar, Button, Switch, Upload, message, Input } from "antd";
import { MyPlaylist } from "../../types/MyPlaylist"
import { PopoverGrf } from "../PopoverGrf";
import styles from './EditPlaylist.module.css';  
import { ChangeEvent, useEffect, useState } from "react";
import { api } from '../../utils/api';
import Backdrop from '@mui/material/Backdrop';

type Props = {
    data: MyPlaylist,
    id: number
}

export const EditPlaylist = ({data, id}: Props) => {
    const props = {
        name: 'file',
        action: `${process.env.NEXT_PUBLIC_BASE_URL_API}/playlist/edit/${id}`,
        headers: {
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjUwOTI1MjU0LCJuYmYiOjE2NTA5MjUyNTQsImp0aSI6Im1QVzBNbUhCb21MbTFhS2siLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.h8b99aiGXJG8jMvKuiN-ZODj4hCbtYubCq7QP0PcS3I',
        }
    };
     
    const [dataPlaylist, setDataPlaylist] = useState(data);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [valueInputName, setValueInputName] = useState(''); 

    const editValueName = () => {
        if(dataPlaylist.playlist != undefined) setValueInputName(dataPlaylist.playlist?.name);
    }

    const editedValueName = async () => {
        setEdit(false);
        await api(`playlist/edit/${id}`, 'post', {name: valueInputName}, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjUwOTI1MjU0LCJuYmYiOjE2NTA5MjUyNTQsImp0aSI6Im1QVzBNbUhCb21MbTFhS2siLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.h8b99aiGXJG8jMvKuiN-ZODj4hCbtYubCq7QP0PcS3I');
        setEdit(true);
    
        setValueInputName('');
    }

    const handleChangeValueName = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInputName(e.target.value);
    }

    const editedPrivacy = async (checked: boolean, e: Event) => { 
        setEdit(false);
        await api(`playlist/edit/${id}`, 'post', {privacy: true}, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjUwOTI1MjU0LCJuYmYiOjE2NTA5MjUyNTQsImp0aSI6Im1QVzBNbUhCb21MbTFhS2siLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.h8b99aiGXJG8jMvKuiN-ZODj4hCbtYubCq7QP0PcS3I');
        setEdit(true);
    }

    useEffect(()=>{ 
        if(edit) {
            const exec = async () => {
                setLoading(true);
                setDataPlaylist(await api(`playlist/${id}`, 'get', {}, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjUwOTI1MjU0LCJuYmYiOjE2NTA5MjUyNTQsImp0aSI6Im1QVzBNbUhCb21MbTFhS2siLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.h8b99aiGXJG8jMvKuiN-ZODj4hCbtYubCq7QP0PcS3I'));
                setLoading(false);
            } 
            exec(); 
        } 
    }, [edit]);

    return (
        <div className={styles.content}>
             <Backdrop  sx={{ color: '#fff' }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className={styles.contentAvatar}>
                <Avatar 
                    shape="square"
                    size={140}
                    src={dataPlaylist.playlist?.avatar}
                    className={styles.avatar} 
                />

                <div className={styles.uploadAvatar} >
                    <Upload 
                        onChange={(info: any) => { 
                            if (info.file.status === 'done') {
                             if(info.file.response.error != '') {
                                message.error(info.file.response.error);
                             } else {
                                setEdit(false);
                                message.success(`${info.file.name} imagem carregada com sucesso`);
                                setEdit(true); 
                             }  
                            } 
                        }}
                        {...props}  showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Alterar imagem</Button>
                    </Upload>
                </div>
            </div>

            <div className={styles.contentInfoPlaylist}>
                <Typography style={{fontSize:'10px'}} variant="overline">
                    <strong>Playlist</strong>
                </Typography>
        
                <div className={styles.contentInfoPlaylistName}>
                        {valueInputName != '' ?
                            <Input 
                                size="large"
                                style={{margin:'1px 0 7px 0',background:'transparent',color:'white'}} 
                                value={valueInputName}
                                onChange={handleChangeValueName}
                            /> 
                        :
                            <Typography variant="h4" gutterBottom component="h4">
                                    <strong>{dataPlaylist.playlist?.name}</strong> 
                            </Typography>
                        }
                        

                        <div>
                            {valueInputName != '' ?
                                <CheckCircleOutlined onClick={editedValueName}  style={{fontSize:'28px',color:'white',marginTop:'3px'}} />
                            :
                                <EditOutlined onClick={editValueName} style={{fontSize:'28px'}}/>
                            } 
                        </div>
                </div>


                <div style={{flex:1,marginTop:'-5px'}}>
                    <Typography style={{fontSize:'10px',marginRight:'4px'}} variant="overline">
                        <strong>Privacidade </strong>
                    </Typography>

                    <PopoverGrf title={dataPlaylist.playlist?.privacy == 1 ? 'Não permitir que ninguém ouçe a playlist' : 'Permitir que todos ouçem a playlist'}>
                        <Switch onChange={editedPrivacy} defaultChecked={dataPlaylist.playlist?.privacy == 1 ? true : false}  />
                    </PopoverGrf>
                </div>
            </div>
          
        </div>
    )
}