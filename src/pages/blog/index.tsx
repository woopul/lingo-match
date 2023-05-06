import { getBlogPostBySlug, getBlogPosts, getLayoutConfig } from '@lingo-match/api/strapi';
import withLayout from '@lingo-match/containers/withLayout';
import { BlogPostType } from '@lingo-match/pages/blog/[slug]';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
  const [layoutConfig, blogPosts] = await Promise.all([
    getLayoutConfig(),
    getBlogPostBySlug('test-slug'),
  ]);

  const posts: BlogPostType[] = [];

  posts.push(
    {
      author: 'test author',
      content: 'test content',
      slug: 'test-slug',
      title: 'test title',
    },
    {
      author: 'test author2',
      content: 'test content2',
      slug: 'test-slug2',
      title: 'test title2',
    },
  );

  return {
    props: {
      blogPosts,
      layoutConfig,
      posts,
    },
  };
};

const BlogList = (props: any) => {
  return (
    <>
      <h1>This is Blog List</h1>
      <div>{JSON.stringify(props)}</div>
      <div>{JSON.stringify(props.blogPosts)}</div>
      <div>{JSON.stringify(props.posts)}</div>
    </>
  );
};

export default withLayout(BlogList);
