import { Image } from '@lingo-match/components';
import { BlogPostDTO } from '@lingo-match/types/strapi/blocks';
import { getBlogUrl } from '@lingo-match/utlis';
import clsx from 'clsx';
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
  console.log(splash, blogCategories);
  return (
    <NextLink
      className={clsx(
        'cursor-pointer no-underline hover:shadow-md flex',
        alignment === 'vertical' ? 'flex-col' : 'flex-row',
        className,
      )}
      href={getBlogUrl(slug)}
    >
      <div className="w-full h-[23.5rem] relative bg-primary-200">
        {splash?.data && (
          <Image
            alt=""
            className="object-cover"
            src={splash.data.attributes?.url || placeholderSrc}
          />
        )}
      </div>
      <div className="flex flex-col [&>*]:mb-1 px-1 mt-1">
        <div className="w-full text-primary-500 flex">
          {blogCategories?.data?.map((categoryItem) => (
            <div
              className="capitalize after:content-['|'] after:mx-1 [&:last-child]:after:content-none"
              key={categoryItem.id}
            >
              {categoryItem.attributes.name}
            </div>
          ))}
        </div>
        <h3>{title}</h3>
        <p className="">{shortDescription}</p>
        <p className={clsx('mt-auto text-darkGray')}>
          BY {author} / {publishedAt}
        </p>
      </div>
    </NextLink>
  );
};

export default PostCard;
