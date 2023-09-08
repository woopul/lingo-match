import PostCard from '@lingo-match/components/Organisms/PostCard';
import { BlogPostDTO } from '@lingo-match/types/strapi/blocks';
import { cn } from '@lingo-match/utlis/cn';
import React from 'react';

export type PostListProps = {
  className?: string;
  display?: 'grid' | 'list';
  posts: BlogPostDTO[];
};

const PostList = ({ className, display = 'grid', posts }: PostListProps) => {
  if (!posts || !posts.length) {
    return null;
  }

  const postCardAlignment = display === 'grid' ? 'vertical' : 'horizontal';

  return (
    <div className={cn('flex flex-col gap-2 py-2 md:grid md:grid-cols-3', className)}>
      {posts.map((post) => (
        <PostCard alignment={postCardAlignment} key={post.slug} {...post} />
      ))}
    </div>
  );
};

export default PostList;
