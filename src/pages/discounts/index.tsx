import { getBlogPostBySlug, getLayoutConfig } from '@lingo-match/api/strapi';
import withLayout from '@lingo-match/containers/withLayout';
import { BlogPostType } from '@lingo-match/pages/blog/[slug]';
import { BaseGetStaticPropsType } from '@lingo-match/types/responses/baseApiResponse';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps<BaseGetStaticPropsType> = async (context) => {
  const layoutConfig = await getLayoutConfig();

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
      layoutConfig: layoutConfig.data.attributes || {},
    },
  };
};

const DiscountPage = (props: any) => {
  return (
    <>
      <h1>This is Discount page</h1>
    </>
  );
};

export default withLayout(DiscountPage);
