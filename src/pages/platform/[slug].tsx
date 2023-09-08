import { getLayoutConfig, getPlatformBySlug } from '@lingo-match/api/strapi';
import { PrettyJSON } from '@lingo-match/components';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import withLayout from '@lingo-match/containers/withLayout';
import { PlatformDTO } from '@lingo-match/types/strapi';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';
import { GetStaticProps } from 'next';
import ReactMarkdown from 'react-markdown';

export const getStaticPaths = async () => ({
  fallback: 'blocking',
  paths: [],
});

export const getStaticProps: GetStaticProps<BaseGetStaticPropsType> = async (context) => {
  const [layoutConfig, platform] = await Promise.all([
    getLayoutConfig(),
    getPlatformBySlug(context.params?.slug as string),
  ]);

  const blocks = (platform as PlatformDTO)?.blocks;
  return {
    props: {
      blocks: blocks || [],
      layoutConfig: layoutConfig || {},
      platform: platform || 'Not found',
    },
    revalidate: DEFAULT_STATIC_PAGE_CACHE_TIME,
  };
};

export type PlatformPageType = {
  platform: PlatformDTO;
};

const PlatformPage = ({ platform }: PlatformPageType) => {
  return (
    <main className="min-h-screen">
      <div className="flex flex-col">
        {<PrettyJSON data={{ blocks: platform.blocks }} key={platform.slug} />}
      </div>
    </main>
  );
};

export default withLayout(PlatformPage);
