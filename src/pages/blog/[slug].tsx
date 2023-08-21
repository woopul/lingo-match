import { getBlogPostBySlug, getLayoutConfig } from '@lingo-match/api/strapi';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import withLayout from '@lingo-match/containers/withLayout';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';
import { BlogPostDTO } from '@lingo-match/types/strapi/blocks';
import { GetStaticProps } from 'next';

export const getStaticPaths = async () => ({
  fallback: 'blocking',
  paths: [],
});

export const getStaticProps: GetStaticProps<BaseGetStaticPropsType> = async ({ params }) => {
  const [layoutConfig, post] = await Promise.all([
    getLayoutConfig(),
    getBlogPostBySlug(params?.slug as string),
  ]);

  const blocks = (post as BlogPostDTO)?.blocks;
  return {
    props: {
      blocks: blocks || [],
      layoutConfig: layoutConfig || {},
      post: post || 'Not found',
    },
    revalidate: DEFAULT_STATIC_PAGE_CACHE_TIME,
  };
};

export type BlogPostPageProps = {
  post: BlogPostDTO;
};

const BlogPostPage = ({ post }: BlogPostPageProps) => {
  return (
    <>
      <h2 className="text-6xl mt-3 font-bold">Blog Post Page</h2>
      <h3 className="my-2">posts :</h3>
    </>
  );
};

export default withLayout(BlogPostPage);
