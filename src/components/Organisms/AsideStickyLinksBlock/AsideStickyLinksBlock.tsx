import { LinkIcon } from '@lingo-match/components/Atoms';
import { PlatformListDTO } from '@lingo-match/types/strapi';

type AsideStickyLinksBlockProps = {
  platformList?: PlatformListDTO;
};

const AsideStickyLinksBlock = ({ platformList }: AsideStickyLinksBlockProps) => {
  return (
    <>
      <div className="mb-1 mt-0.5">{platformList?.title}</div>
      <div className="flex flex-col gap-1">
        {platformList?.links?.map((link, i) => {
          return (
            <LinkIcon
              className="text-paragraph uppercase"
              href={link.href || ''}
              iconSrc={link.icon?.data?.attributes.url || ''}
              key={`${link.href}-${link.label || ''}-${i}`}
              label={link.label || ''}
            />
          );
        })}
      </div>
    </>
  );
};

export default AsideStickyLinksBlock;
