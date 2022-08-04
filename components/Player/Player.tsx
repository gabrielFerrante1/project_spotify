import { Typography } from '@mui/material';
import { Avatar } from 'antd';
import { Col, Row } from 'react-bootstrap';
import styles from './Player.module.css';
import { Controls } from './Controls';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const Player = () => {
    const player = useSelector((state: RootState) => state.player);

    return (
        <div className={styles.contentPlayer}>
            <Row>
                <Col md={3}>
                    <div className={styles.infoPlayer}>
                        <Avatar
                            className={styles.infoPlayerAvatar}
                            shape="square"
                            src={player.playlist.length > 0 && player.isPlaying >= 0 ?
                                player.playlist[player.isPlaying].avatar
                                :
                                'https://i.kinja-img.com/gawker-media/image/upload/s--ypN6iH9q--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/zrarqnhmkoaihvzss5ek.jpg'
                            }
                        />

                        <div className={styles.infoPlayerNameAndAuthor}>

                            <Typography className={styles.infoPlayerName} variant="subtitle1" component="h4">
                                {player.playlist.length > 0 && player.isPlaying >= 0 ?
                                    player.playlist[player.isPlaying].name
                                    :
                                    ''
                                }
                            </Typography>

                            <small>
                                {player.playlist.length > 0 && player.isPlaying >= 0 ?
                                    player.playlist[player.isPlaying].author
                                    :
                                    ''
                                }
                            </small>
                        </div>
                    </div>
                </Col>

                <Col offset={1} md={9}>
                    <Controls />
                </Col>
            </Row>
        </div>
    )
}