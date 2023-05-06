import { getLayoutConfig } from '@lingo-match/api/strapi';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import withLayout from '@lingo-match/containers/withLayout';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
  const layoutConfig = await getLayoutConfig();

  return {
    props: {
      layoutConfig: layoutConfig || {},
    },
    revalidate: DEFAULT_STATIC_PAGE_CACHE_TIME,
  };
};

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="text-6xl font-bold mt-6">Home Page</h2>
    </main>
  );
};

export default withLayout(Home);
