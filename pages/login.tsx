import { Row } from "react-bootstrap";
import { Typography } from 'antd';
import styles from '../styles/Login.module.css';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { Alert } from "@mui/material";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../libs/api";
import AreaInput from "../components/Auth/AreaInput";
import { AuthUser } from "../libs/types/AuthUser";

const { Text } = Typography;

const Login = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [valueInputName, setValueInputName] = useState('');
    const [valueInputEmail, setValueInputEmail] = useState('');
    const [valueInputPassword, setValueInputPassword] = useState('');
    const [error, setError] = useState('');

    const redirectAfterLogin = () => {
        if (router.query.callbackUrl) {
            router.push(router.query.callbackUrl as string)
        } else {
            router.push('/')
        }
    }

    const inputValidators = () => {
        if (
            (authMode === 'create' ? valueInputName == '' : false) ||
            valueInputEmail == '' ||
            valueInputPassword == ''
        ) {
            setError('Preencha todos os campos');
            return true;
        }

        return false;
    }

    const handleLogin = async () => {
        if (inputValidators()) return;

        setLoading(true);
        const requestLogin = await signIn('credentials', { redirect: false, email: valueInputEmail, password: valueInputPassword })

        if (requestLogin && requestLogin.ok) {
            redirectAfterLogin();
        } else {
            setLoading(false);
            setError('Email ou senha inválidos')
        }
    }

    const handleCreate = async () => {
        if (inputValidators()) return;

        setLoading(true);
        // Register new account
        const requestRegister: AuthUser = await api('create', 'post', {
            name: valueInputName,
            email: valueInputEmail,
            password: valueInputPassword
        })

        if (requestRegister.error != '') {
            setLoading(false);
            setError(requestRegister.error);

            return;
        }

        // Login with new account
        await signIn('credentials', { redirect: false, email: valueInputEmail, password: valueInputPassword })
        redirectAfterLogin();
    }

    useEffect(() => { setError('') }, [authMode])

    return (
        <>
            <div className={styles.container}>
                <Alert
                    className={styles.alertError}
                    hidden={!error}
                    variant="outlined"
                    severity="error"
                >
                    {error}
                </Alert>

                <Row>
                    <VerifiedUserOutlinedIcon className={styles.iconUser} />
                    <Text className={styles.textUser}>Faça login ou crie uma conta</Text>

                    <div className={styles.containerInput}>
                        <AreaInput
                            loading={loading}
                            authMode={authMode}
                            valueInputName={valueInputName}
                            valueInputEmail={valueInputEmail}
                            valueInputPassword={valueInputPassword}
                            setValueInputName={setValueInputName}
                            setValueInputEmail={setValueInputEmail}
                            setValueInputPassword={setValueInputPassword}
                        />
                    </div>

                    <div className={styles.containerFooter}>
                        {authMode === 'login' ?
                            <span className={styles.notHaveAccount}>
                                Não tem conta? <button onClick={() => setAuthMode('create')}>Criar uma</button>
                            </span>
                            :
                            <span className={styles.notHaveAccount}>
                                Já tem conta? <button onClick={() => setAuthMode('login')}>Entrar</button>
                            </span>
                        }

                        {authMode === 'login' ?
                            <button
                                onClick={handleLogin}
                                className={styles.btnActionAuth}
                                disabled={loading}
                            >Entrar</button>
                            :
                            <button
                                onClick={handleCreate}
                                className={styles.btnActionAuth}
                                disabled={loading}
                            >Criar</button>
                        }
                    </div>
                </Row>
            </div>
        </>
    )
}

export default Login;