import '../styles/styles.css';
import type { AppProps } from 'next/app';
import { DM_Sans } from '@next/font/google';
import { HeaderPlaceholder } from '@lingo-match/components';

const dmSans = DM_Sans({
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
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
}
