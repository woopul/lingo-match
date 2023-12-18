import { Image } from '@lingo-match/components';
import { BlogPostDTO } from '@lingo-match/types/strapi/blocks';
import { getBlogUrl } from '@lingo-match/utlis';
import { cn } from '@lingo-match/utlis/cn';
import NextLink from 'next/link';

export type PostCardProps = Pick<
  BlogPostDTO,
  'slug' | 'title' | 'shortDescription' | 'author' | 'splash' | 'publishedAt' | 'blogCategories'
> & {
  alignment: 'vertical' | 'horizontal';
  className?: string;
};

const placeholderSrc =
  'https://res.cloudinary.com/dbnc7cgvp/image/upload/v1682797183/logo_2_33627850b1.png';

const PostCard = ({
  alignment = 'vertical',
  author,
  blogCategories,
  className,
  publishedAt,
  shortDescription,
  slug,
  splash,
  title,
}: PostCardProps) => {
  return (
    <NextLink
      className={cn(
        'flex cursor-pointer no-underline hover:shadow-md',
        alignment === 'vertical' ? 'flex-col' : 'flex-row',
        className,
      )}
      href={getBlogUrl(slug)}
    >
      <div className="relative h-[23.5rem] w-full bg-primary-200">
        {splash?.data && (
          <Image
            alt=""
            className="object-cover"
            src={splash.data.attributes?.url || placeholderSrc}
          />
        )}
      </div>
      <div className="mt-1 flex flex-col px-1 [&>*]:mb-1">
        <div className="flex w-full text-primary-500">
          {blogCategories?.data?.map((categoryItem) => (
            <div
              className="capitalize after:mx-1 after:content-['|'] [&:last-child]:after:content-none"
              key={categoryItem.id}
            >
              {categoryItem.attributes.name}
            </div>
          ))}
        </div>
        <h3>{title}</h3>
        <p className="">{shortDescription}</p>
        <p className={cn('text-darkGray mt-auto')}>
          BY {author} / {publishedAt}
        </p>
      </div>
    </NextLink>
  );
};

export default PostCard;
