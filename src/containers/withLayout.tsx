import { Layout } from '@lingo-match/components';
import BlockRenderer from '@lingo-match/components/BlockRenderer';
import { LayoutConfigDTO } from '@lingo-match/components/Layout';
import { LabelsProvider } from '@lingo-match/context/LabelsProvider';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';

export type WithLayoutProps = LayoutConfigDTO & Record<any, any>;

const withLayout = (Component: any) => {
  const wrappedComponent = ({
    blocks,
    layoutConfig,
    sitewideLabels = {},
    ...rest
  }: BaseGetStaticPropsType) => {
    return (
      <LabelsProvider labels={sitewideLabels}>
        <Layout layoutConfig={layoutConfig}>
          <Component {...rest}>{!!blocks && <BlockRenderer blocks={blocks} />}</Component>
        </Layout>
      </LabelsProvider>
    );
  };
  return wrappedComponent;
};

export default withLayout;
