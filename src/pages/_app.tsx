import '../styles/styles.css';

import { DM_Sans } from '@next/font/google';
import type { AppProps } from 'next/app';

const dmSans = DM_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '700'],
});

const CustomApp = ({ Component, pageProps }: AppProps) => {
  console.log('APP', { Component, pageProps });
  return (
    <>
      <style global jsx>{`
        :root {
          --font-dm: ${dmSans.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
};

export default CustomApp;
