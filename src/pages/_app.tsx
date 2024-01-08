import '../styles/styles.css';

import ErrorBoundary from '@lingo-match/components/Organisms/ErrorBoundary';
import { Toaster } from '@lingo-match/components/ui/sonner';
import { DM_Sans } from '@next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
        <Toaster />
      </ErrorBoundary>
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default CustomApp;
