import styles from './Layout.module.css'; 
import Typography from '@mui/material/Typography';
import {
    HomeOutlined,
    SearchOutlined,
    ProfileOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';

type Props = {
    label: string
    url: string
}

export default ({ label, url }: Props) => { 
    const router = useRouter()

    const redirect = () => router.push(url)

    return (
        <li
            onClick={redirect}
            className={`${styles.appLeftBarDivLiDiv} ${router.pathname == url && styles.activeRoute}`}
        >
            {label == 'Home' ?
                <HomeOutlined className={styles.appLeftBarIcons} />
                : label == 'Buscar' ?
                    <SearchOutlined className={styles.appLeftBarIcons} />
                    : label == 'Suas playlists' ?
                        <ProfileOutlined className={styles.appLeftBarIcons} />
                        : ''}

            <div className="align-self-center">
                <Typography
                    className={styles.appLeftBarTexts}
                    variant="h5"
                    gutterBottom
                    component="span"
                >
                    {label}
                </Typography>
            </div>
        </li>
    )
}