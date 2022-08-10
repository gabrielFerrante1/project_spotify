import Input from "./AuthInput";
import styles from '../../styles/login.module.css'

type Props = {
    loading: boolean,
    authMode: string;
    valueInputName: string;
    valueInputEmail: string;
    valueInputPassword: string;
    setValueInputName: (value: string) => void;
    setValueInputEmail: (value: string) => void;
    setValueInputPassword: (value: string) => void;
}

const AreaInput = ({
    loading, authMode, valueInputName, valueInputEmail, valueInputPassword,
    setValueInputName, setValueInputEmail, setValueInputPassword
}: Props) => {

    return (
        <>
            {authMode === 'create' &&
                <Input
                    disabled={loading}
                    className={styles.input}
                    label="Nome"
                    variant="outlined"
                    focused
                    type='text'
                    value={valueInputName}
                    onChange={(e) => setValueInputName(e.target.value)}
                />
            }

            <Input
                disabled={loading}
                className={styles.input}
                label="Email"
                variant="outlined"
                focused={authMode === 'login' ? true : false}
                type='email'
                value={valueInputEmail}
                onChange={(e) => setValueInputEmail(e.target.value)}
            />

            <Input
                disabled={loading}
                className={styles.input}
                label="Senha"
                variant="outlined"
                value={valueInputPassword}
                onChange={(e) => setValueInputPassword(e.target.value)}
            />
        </>
    )
}

export default AreaInput;