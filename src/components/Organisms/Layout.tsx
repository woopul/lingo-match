import { USPBar } from '@lingo-match/components';
import { PropsWithChildren } from 'react';

import Header from './Header';

export type LayoutProps = {
  layoutConfig?: any;
};

const Layout = ({ children, layoutConfig }: PropsWithChildren<LayoutProps>) => (
  <div className="w-full h-full bg-primary-50">
    <USPBar />
    <Header />
    <main className="mx-auto max-w-[1920px]">{children}</main>
  </div>
);

export default Layout;
