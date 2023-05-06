import { Layout } from '@lingo-match/components/Organisms';

const withLayout = (Component: any) => {
  const wrappedComponent = (props: any) => {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
  return wrappedComponent;
};

export default withLayout;
