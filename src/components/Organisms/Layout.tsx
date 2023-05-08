import { Footer } from '@lingo-match/components/Organisms/Footer';
import { SeoDTO } from '@lingo-match/types/strapi/shared';
import { PropsWithChildren } from 'react';

import Header, { HeaderDTO } from './Header';

export type LayoutConfigDTO = {
  defaultSEO?: SeoDTO;
  header?: HeaderDTO;
};

export type LayoutProps = {
  layoutConfig?: LayoutConfigDTO;
};

const Layout = ({ children, layoutConfig }: PropsWithChildren<LayoutProps>) => (
  <div className="w-full min-h-[100vh] bg-primary-50 flex flex-col">
    <Header {...layoutConfig?.header} />
    <main className="mx-auto w-full max-w-[144rem] px-5 overflow-hidden">{children}</main>
    <Footer className="mt-auto" />
  </div>
);

export default Layout;
