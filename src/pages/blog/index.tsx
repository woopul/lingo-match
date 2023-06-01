import { getBlogPosts, getLayoutConfig } from '@lingo-match/api/strapi';
import { GradientBox, Link, PostList, PrettyJSON } from '@lingo-match/components';
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
  };
};

type BlogListPageProps = {
  blogPosts: BlogPostDTO[];
};

const BlogListPage = ({ blogPosts }: BlogListPageProps) => {
  return (
    <>
      <GradientBox />
      <h2 className="text-6xl font-bold my-3 text-white">Blog List Page</h2>
      <PostList posts={blogPosts} />
    </>
  );
};

export default withLayout(BlogListPage);
