import { Layout } from '@lingo-match/components';
import BlockRenderer from '@lingo-match/components/BlockRenderer';
import { LayoutConfigDTO } from '@lingo-match/components/Layout';
import blockConfig from '@lingo-match/config/block.config';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';

export type WithLayoutProps = LayoutConfigDTO & Record<any, any>;

const withLayout = (Component: any) => {
  const wrappedComponent = ({ blocks, layoutConfig, ...rest }: BaseGetStaticPropsType) => {
    console.log('withLayout blocks', blocks);
    return (
      <Layout layoutConfig={layoutConfig}>
        <Component {...rest} />
        {blocks && <BlockRenderer blockConfig={blockConfig} blocks={blocks} />}
      </Layout>
    );
  };
  return wrappedComponent;
};

export default withLayout;
