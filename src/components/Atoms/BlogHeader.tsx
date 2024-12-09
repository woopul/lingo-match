import { Image } from '@lingo-match/components';
import { formatDate } from '@lingo-match/helpers/formatDate';

import { MaxWidthWrapper } from './MaxWidthWrapper';

export type BlogHeaderProps = {
  author: {
    avatar?: string;
    link?: string;
    name: string;
  };
  publishedAt: string;
  timeToRead?: number;
  title: string;
};

export const BlogHeader = ({ author, publishedAt, timeToRead, title }: BlogHeaderProps) => {
  return (
    <MaxWidthWrapper className="relative flex flex-col gap-2 pt-10" type="read">
      <h1 className="text-h2">{title}</h1>
      <div className="flex gap-2">
        <div className="relative h-6 w-6 rounded-full bg-purple-300">
          {author.avatar && (
            <Image alt={author.name} className="rounded-full object-contain" src={author.avatar} />
          )}
        </div>
        <div className="flex gap-1">{author.name}</div>
      </div>
      <dl>
        <dt className="sr-only">Date</dt>
        <dd className="text-paragraph-sm absolute inset-x-0 top-5">
          <time dateTime={publishedAt}>{formatDate(publishedAt, { month: 'long' })}</time>
          <span className="mx-1">|</span>
          <span className="italic"> {(timeToRead ?? 0) + 1}min do przeczytania</span>
        </dd>
      </dl>
    </MaxWidthWrapper>
  );
};
