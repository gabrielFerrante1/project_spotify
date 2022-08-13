import { Typography } from 'antd'
import type { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { useRouter } from 'next/router'
import { Row } from 'react-bootstrap'
import OnePlaylist from '../components/Playlist'
import { api } from '../libs/api'
import { InfoHome } from '../libs/types/InfoHome'
import styles from '../styles/Home.module.css'
import { authOptions } from './api/auth/[...nextauth]'

const { Text } = Typography

type Props = {
    data: InfoHome
}

const Home = ({ data }: Props) => {
    const router = useRouter();

    const search = (value: string) => {
        router.push('/search', {
            query: {
                query: value
            }
        })
    }

    return (
        <div className={styles.container}>
            <Row>
                <Text className={styles.title} strong>Playlists com destaques</Text>

                <div className={styles.contentListPlaylist}>
                    {data.featured_playlist.map((item, key) => (
                        <OnePlaylist
                            key={key}
                            item={item}
                        />
                    ))}
                </div>
            </Row>

            <Row className='mt-5'> 
                <Text className={styles.title} strong>Genêros que você mais ouviu</Text>

                <div className={styles.gridGenre}>
                    {data.most_listened_genres?.map((genre, key) => (
                        <div
                            style={{ backgroundColor: genre.color }}
                            className={styles.genre}
                            key={key}
                            onClick={() => search(genre.name)}
                        >
                            <Text className={styles.nameGenre} strong>{genre.name}</Text>
                        </div>
                    ))}
                </div>
            </Row>
        </div>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(
        context.req, context.res, authOptions
    )

    const data: InfoHome = await api('search/home', 'get', {}, session?.user.jwt)

    return {
        props: {
            data
        }
    }
}