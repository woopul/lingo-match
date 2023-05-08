import { Layout } from '@lingo-match/components/Organisms';
import { LayoutConfigDTO } from '@lingo-match/components/Organisms/Layout';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';

export type WithLayoutProps = LayoutConfigDTO & Record<any, any>;

const withLayout = (Component: any) => {
  const wrappedComponent = ({ layoutConfig, ...rest }: BaseGetStaticPropsType) => {
    return (
      <Layout layoutConfig={layoutConfig}>
        <Component {...rest} />
      </Layout>
    );
  };
  return wrappedComponent;
};

export default withLayout;
