import { getBlogPosts, getLayoutConfig } from '@lingo-match/api/strapi';
import withLayout from '@lingo-match/containers/withLayout';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
  const [layoutConfig, blogPosts] = await Promise.all([getLayoutConfig(), getBlogPosts()]);

  return {
    props: {
      blogPosts,
      layoutConfig: layoutConfig || {},
    },
  };
};

const BlogListPage = (props: any) => {
  return (
    <>
      <h1>This is Blog List</h1>
      <div>{JSON.stringify(props)}</div>
      <div>{JSON.stringify(props.blogPosts)}</div>
      <div>{JSON.stringify(props.posts)}</div>
    </>
  );
};

export default withLayout(BlogListPage);
