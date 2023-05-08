import { getBlogPostBySlug, getLayoutConfig, getPlatformBySlug } from '@lingo-match/api/strapi';
import { PrettyJSON } from '@lingo-match/components';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import withLayout from '@lingo-match/containers/withLayout';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';
import { GetStaticProps } from 'next';
import ReactMarkdown from 'react-markdown';

export const getStaticPaths = async () => ({
  fallback: 'blocking',
  paths: [],
});

export const getStaticProps: GetStaticProps<BaseGetStaticPropsType> = async ({ params }) => {
  const [layoutConfig, post] = await Promise.all([
    getLayoutConfig(),
    getPlatformBySlug(params?.slug as string),
  ]);

  return {
    props: {
      layoutConfig: layoutConfig || {},
      post: post || 'Not found',
    },
    revalidate: DEFAULT_STATIC_PAGE_CACHE_TIME,
  };
};

export type BlogPostType = {
  author: string;
  content: string;
  slug: string;
  title: string;
};

export type BlogPostPageProps = {
  post: BlogPostType;
};

const PlatformPage = ({ post }: BlogPostPageProps) => {
  return (
    <main className="min-h-screen">
      <h2 className="text-6xl font-bold mt-3">Platform Page</h2>
      <h3 className="my-2">platform: </h3>
      <div className="flex flex-col">{<PrettyJSON data={post} key={post.slug} />}</div>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </main>
  );
};

export default withLayout(PlatformPage);
