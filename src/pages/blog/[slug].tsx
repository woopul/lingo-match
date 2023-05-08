import { getLayoutConfig } from '@lingo-match/api/strapi';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import withLayout from '@lingo-match/containers/withLayout';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';
import { GetStaticProps } from 'next';

export const getStaticPaths = async () => ({
  fallback: 'blocking',
  paths: [],
});

export const getStaticProps: GetStaticProps<BaseGetStaticPropsType> = async (context) => {
  const layoutConfig = await getLayoutConfig();

  const post = {
    author: 'test author',
    content: 'test content',
    slug: 'test-slug',
    title: 'test title',
  };

  return {
    props: {
      layoutConfig: layoutConfig || {},
      post,
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

const BlogPostPage = ({ post }: BlogPostPageProps) => {
  return (
    <>
      <h1>This is BlogPostPage</h1>
      {JSON.stringify(post)}
    </>
  );
};

export default withLayout(BlogPostPage);
