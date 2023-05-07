import { getLayoutConfig } from '@lingo-match/api/strapi';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import withLayout from '@lingo-match/containers/withLayout';
import { BaseGetStaticPropsType } from '@lingo-match/types/responses/baseApiResponse';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps<BaseGetStaticPropsType> = async (context) => {
  const layoutConfig = await getLayoutConfig();

  return {
    props: {
      layoutConfig: layoutConfig.data.attributes || {},
    },
    revalidate: DEFAULT_STATIC_PAGE_CACHE_TIME,
  };
};

const HomePage = (props: BaseGetStaticPropsType) => {
  console.log('homepage props', props);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="text-6xl font-bold mt-6">HomePage Page</h2>
    </main>
  );
};

export default withLayout(HomePage);
