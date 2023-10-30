import { Layout } from '@lingo-match/components';
import BlockRenderer from '@lingo-match/components/BlockRenderer';
import { LayoutConfigDTO } from '@lingo-match/components/Layout';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';

export type WithLayoutProps = LayoutConfigDTO & Record<any, any>;

const withLayout = (Component: any) => {
  const wrappedComponent = ({ blocks, layoutConfig, ...rest }: BaseGetStaticPropsType) => {
    console.log({ blocks });
    return (
      <Layout layoutConfig={layoutConfig}>
        <Component {...rest} />
        {blocks && <BlockRenderer blocks={blocks} />}
      </Layout>
    );
  };
  return wrappedComponent;
};

export default withLayout;
