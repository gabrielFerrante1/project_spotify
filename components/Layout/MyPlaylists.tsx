import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../libs/redux/store";
import styles from './Layout.module.css'

const MyPlaylists = () => {
    const player = useSelector((state: RootState) => state.player)
    const infos = useSelector((state: RootState) => state.clientInfos)

    const router = useRouter()

    const goToPlaylist = (id: number) => {
        router.push(`/playlist/${id}`)
    }

    return (
        <div>
            <ul className={styles.playlistUl}>
                {infos.playlists.slice(0, 15).map((item, key) => (
                    <li
                        className={player.isPlayingData.tipo == 'Playlist' && player.isPlayingData.id== item.id ? styles.activePlaylist : ''}
                        key={key}
                        onClick={() => goToPlaylist(item.id)}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MyPlaylists;