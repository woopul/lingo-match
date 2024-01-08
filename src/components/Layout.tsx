import { Footer, FooterColumnType } from '@lingo-match/components';
import { SeoDTO } from '@lingo-match/types/strapi/shared';
import { PropsWithChildren } from 'react';
import { toast } from 'sonner';

import Header, { HeaderDTO } from './Organisms/Header/Header';

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
    <div className="flex min-h-[100vh] w-full flex-col bg-white">
      <Header {...header} />
      <main className="mx-auto w-full max-w-[144rem] flex-1 px-2 pb-8 desktop:px-8">
        {children}
      </main>
      <Footer footerColumns={footerColumns || []} />
    </div>
  );
};

export default Layout;
