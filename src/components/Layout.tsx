import { Footer, FooterColumnType } from '@lingo-match/components';
import { SeoDTO } from '@lingo-match/types/strapi/shared';
import { PropsWithChildren } from 'react';

import Header, { HeaderDTO } from './Organisms/Header';

export type LayoutConfigDTO = {
  defaultSEO?: SeoDTO;
  footerColumns?: FooterColumnType[];
  header?: HeaderDTO;
};

export type LayoutProps = {
  layoutConfig: LayoutConfigDTO;
};

//TODO: add SEO component, add locales to next config, redirect in middleware
const Layout = ({ children, layoutConfig }: PropsWithChildren<LayoutProps>) => {
  const { footerColumns, header } = layoutConfig;
  return (
    <div className="w-full min-h-[100vh] bg-lighterGrey flex flex-col ">
      <Header {...header} />
      <main className="mx-auto w-full max-w-[144rem] px-8 pb-8">{children}</main>
      <Footer className="mt-auto" footerColumns={footerColumns || []} />
    </div>
  );
};

export default Layout;
