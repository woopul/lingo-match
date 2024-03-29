import { getBlogPostBySlug, getLayoutConfig } from '@lingo-match/api/strapi';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import withLayout from '@lingo-match/containers/withLayout';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';
import { BlogPostDTO } from '@lingo-match/types/strapi/blocks';
import { GetStaticProps } from 'next';
import { ReactNode } from 'react';

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
    },
    revalidate: DEFAULT_STATIC_PAGE_CACHE_TIME,
  };
};

export type BlogPostPageProps = {
  children: ReactNode;
};

const BlogPostPage = ({ children }: BlogPostPageProps) => {
  return <div className="mx-auto max-w-[870px] pt-2 md:pt-3 lg:pt-4">{children}</div>;
};

export default withLayout(BlogPostPage);
