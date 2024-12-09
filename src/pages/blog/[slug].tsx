import { getBlogPostBySlug, getLayoutConfig } from '@lingo-match/api/strapi';
import { BlogHeader } from '@lingo-match/components/Atoms/BlogHeader';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import withLayout from '@lingo-match/containers/withLayout';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';
import { BlogPostDTO } from '@lingo-match/types/strapi/blocks';
import { getBlogPostTimeToRead } from '@lingo-match/utlis/getBlogPostTimeToRead';
import { GetStaticProps } from 'next';
import Image from 'next/image';
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

  const { author, blocks, createdAt, title } = post as BlogPostDTO;
  const timeToRead = getBlogPostTimeToRead(blocks);

  return {
    props: {
      author,
      blocks: blocks || [],
      createdAt,
      layoutConfig: layoutConfig || {},
      timeToRead,
      title,
    },
    revalidate: DEFAULT_STATIC_PAGE_CACHE_TIME,
  };
};

export type BlogPostPageProps = {
  author: string;
  children: ReactNode;
  createdAt: string;
  timeToRead: number;
  title: string;
};

const BlogPostPage = ({ author, children, createdAt, timeToRead, title }: BlogPostPageProps) => {
  const authorProps = {
    // TODO: remove later
    avatar: 'https://avatar.iran.liara.run/public',
    name: author,
  };
  return (
    <>
      <BlogHeader
        author={authorProps}
        publishedAt={createdAt}
        timeToRead={timeToRead}
        title={title}
      />
      <div className="absolute right-0 top-20 h-[800px] w-full">
        <picture>
          <Image
            alt="Blog Background Shadow"
            layout="fill"
            objectFit="cover"
            quality={100}
            src="/bg-blog-shadow.avif"
          />
        </picture>
      </div>

      <div className="relative mx-auto max-w-[870px] pt-2 md:pt-3 lg:pt-4">{children}</div>
    </>
  );
};

export default withLayout(BlogPostPage);
