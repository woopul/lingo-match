import { getBlogPosts, getLayoutConfig } from '@lingo-match/api/strapi';
import { GradientBox, Link, PostList, PrettyJSON } from '@lingo-match/components';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import withLayout from '@lingo-match/containers/withLayout';
import { BlogPostDTO } from '@lingo-match/types/strapi/blocks';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
  // const [layoutConfig, blogPosts] = await Promise.all([), getBlogPosts()]);

  const layoutConfig = await getLayoutConfig();
  const blogPosts = await getBlogPosts();
  return {
    props: {
      blogPosts,
      layoutConfig: layoutConfig || {},
    },
    revalidate: DEFAULT_STATIC_PAGE_CACHE_TIME,
  };
};

type BlogListPageProps = {
  blogPosts: BlogPostDTO[];
};

const BlogListPage = ({ blogPosts }: BlogListPageProps) => {
  return (
    <>
      <PostList posts={blogPosts} />
    </>
  );
};

export default withLayout(BlogListPage);
