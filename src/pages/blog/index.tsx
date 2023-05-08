import { getBlogPosts, getLayoutConfig } from '@lingo-match/api/strapi';
import { Link, PrettyJSON } from '@lingo-match/components';
import withLayout from '@lingo-match/containers/withLayout';
import { BlogPostDTO } from '@lingo-match/types/strapi/blocks';
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

type BlogListPageProps = {
  blogPosts: BlogPostDTO[];
};

const BlogListPage = ({ blogPosts }: BlogListPageProps) => {
  return (
    <main className="min-h-screen">
      <h2 className="text-6xl font-bold mt-3">Blog List Page</h2>
      <h3 className="my-2">blog posts :</h3>
      <div className="flex flex-col">
        {blogPosts.map((post) => (
          <Link
            className="p-3 hover:outline outline-indigo-400"
            href={`/blog/${post.slug}` || '#'}
            key={post.slug}
          >
            <PrettyJSON data={post} key={post.slug} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default withLayout(BlogListPage);
