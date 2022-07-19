import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { Layout } from '../components/Layout/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
          <Provider store={store}>
                <Head>
                    <title>Spotify</title>
                    <link rel='icon' href='https://logopng.com.br/logos/spotify-149.png' />
                </Head>

                <Layout>  
                    <Component {...pageProps} />
                </Layout>
          </Provider>
         )
}

export default MyApp
