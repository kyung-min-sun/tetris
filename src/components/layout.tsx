import {PropsWithChildren, ReactNode} from 'react';
import {ThemeProvider, createTheme} from '@mui/material';

import Head from 'next/head';
import {Inter} from 'next/font/google';

const inter = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-inter',
});

export const theme = createTheme({
  palette: {
    primary: {
      light: '#325AFF',
      main: '#325AFF',
      dark: '#64748b',
    },
    secondary: {
      light: '#E8E8ED',
      main: '#7B7E86',
      dark: '#64748b',
    },
    text: {
      primary: '#E5E5E5',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: '#131416',
          color: 'white',
        },
      },
    },
  },
});

interface LayoutProps extends PropsWithChildren {
  title?: string;
}

/**
 * Website layout
 * @param {LayoutProps} props
 * @return {ReactNode}
 */
export default function Layout(
    {children, title = 'Tetris'}: LayoutProps): ReactNode {
  return (
    <main className="bg-slate-200 min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </main>
  );
}
