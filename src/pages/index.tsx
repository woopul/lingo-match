import { getLayoutConfig, getPlatforms } from '@lingo-match/api/strapi';
import { Link, PrettyJSON } from '@lingo-match/components';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import withLayout from '@lingo-match/containers/withLayout';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';
import { PlatformDTO } from '@lingo-match/types/strapi/blocks';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps<BaseGetStaticPropsType> = async (context) => {
  const [layoutConfig, platforms] = await Promise.all([getLayoutConfig(), getPlatforms()]);

  return {
    props: {
      layoutConfig: layoutConfig || {},
      platforms: platforms || [],
    },
    revalidate: DEFAULT_STATIC_PAGE_CACHE_TIME,
  };
};

type HomePageProps = {
  platforms: PlatformDTO[];
};

const HomePage = ({ platforms }: HomePageProps) => {
  return (
    <main>
      <h2 className="text-6xl font-bold mt-3">Home Page - Platform list</h2>
      <h3 className="my-2">platforms :</h3>
      <div className="flex flex-col">
        {platforms.map((platform) => (
          <Link
            className="p-3 hover:outline outline-indigo-400"
            href={`/platform/${platform.slug}` || '#'}
            key={platform.slug}
          >
            <PrettyJSON data={platform} key={platform.slug} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default withLayout(HomePage);
