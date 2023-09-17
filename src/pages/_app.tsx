import Layout from '@/components/layout';
import '@/styles/globals.css';
import {NextPage} from 'next';
import type {AppProps} from 'next/app';
import {ReactElement, ReactNode} from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

/**
 * @param {AppProps} param0
 * @return {Component}
 */
export default function App({Component, pageProps}: AppPropsWithLayout) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps}/>);
  }
  return <Layout>
    <Component {...pageProps}/>
  </Layout>;
}
