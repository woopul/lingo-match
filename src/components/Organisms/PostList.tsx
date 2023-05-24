import PostCard from '@lingo-match/components/Organisms/PostCard';
import { BlogPostDTO } from '@lingo-match/types/strapi/blocks';
import clsx from 'clsx';
import React from 'react';

export type PostListProps = {
  display?: 'grid' | 'list';
  posts: BlogPostDTO[];
};

const PostList = ({ display = 'grid', posts }: PostListProps) => {
  if (!posts || !posts.length) {
    return null;
  }

  const postCardAlignment = display === 'grid' ? 'vertical' : 'horizontal';

  console.log('posts', posts);
  return (
    <div className={clsx('grid grid-cols-3 gap-2')}>
      {posts.map((post) => (
        <PostCard alignment={postCardAlignment} key={post.slug} {...post} />
      ))}
    </div>
  );
};

export default PostList;
