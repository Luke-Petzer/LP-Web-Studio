import type { AppProps } from 'next/app';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../src/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default MyApp;