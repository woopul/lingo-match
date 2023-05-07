import { USPBar } from '@lingo-match/components';
import { SeoDTO } from '@lingo-match/types/responses/shared';
import { PropsWithChildren } from 'react';

import Header, { HeaderDTO } from './Header';

export type LayoutConfigDTO = {
  Header?: HeaderDTO;
  defaultSEO?: SeoDTO;
};

export type LayoutProps = {
  layoutConfig?: LayoutConfigDTO;
};

const Layout = ({ children, layoutConfig }: PropsWithChildren<LayoutProps>) => (
  <div className="w-full min-h-[100vh] bg-primary-50">
    {/*<USPBar />*/}
    <Header {...layoutConfig?.Header} />
    <main className="mx-auto max-w-[144rem] px-5">{children}</main>
  </div>
);

export default Layout;
