import '../styles/styles.css';

import { HeaderPlaceholder } from '@lingo-match/components';
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
      <main className="mx-auto max-w-[1920px]">
        <HeaderPlaceholder />
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default CustomApp;
