import './index.css';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './AppRouter';
import { HelmetProvider } from 'react-helmet-async';

const root = createRoot(document.getElementById('root')!);
root.render(
  <HelmetProvider>
    <AppRouter />
  </HelmetProvider>
);
