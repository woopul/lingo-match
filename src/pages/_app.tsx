import '../styles/styles.css';

import ErrorBoundary from '@lingo-match/components/Organisms/ErrorBoundary';
import { DM_Sans } from '@next/font/google';
import type { AppProps } from 'next/app';

const dmSans = DM_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '700'],
});

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style global jsx>{`
        :root {
          --font-dm: ${dmSans.style.fontFamily};
        }
      `}</style>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
};

export default CustomApp;
