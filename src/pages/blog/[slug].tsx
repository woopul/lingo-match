import { getLayoutConfig } from '@lingo-match/api/strapi';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import { GetStaticProps } from 'next';

export const getStaticPaths = async () => ({
  fallback: 'blocking',
  paths: [],
});

export const getStaticProps: GetStaticProps = async (context) => {
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

export type BlogPostProps = {
  post: BlogPostType;
};

const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <>
      <h1>This is BlogPostPage</h1>
      {JSON.stringify(post)}
    </>
  );
};

export default BlogPost;
