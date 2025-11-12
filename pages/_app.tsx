import '../src/index.css';
import type { AppProps } from 'next/app';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from '../src/components/Layout';
import { ScrollToTop } from '../src/components/ScrollToTop';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </HelmetProvider>
  );
}
