import { SectionWithTitleProps } from '@lingo-match/components/Organisms/SectionWithTitle';
import { SectionWithTitleDTO } from '@lingo-match/types/strapi';
import { StrapiBlockType } from '@lingo-match/types/strapi/blocks';

const DEFAULT_WORDS_PER_MINUTE = 200;

export const getBlogPostTimeToRead = (
  blocks: (SectionWithTitleDTO | StrapiBlockType)[],
): number => {
  const totalWords = blocks.reduce((acc, block) => {
    if (block.__component === 'blocks.section-with-title') {
      const { description, title } = block as SectionWithTitleProps;
      const titleWords = title?.title.split(' ').length ?? 0;
      const descriptionWords =
        description?.reduce((descAcc, desc) => {
          return descAcc + desc.descriptionText.split(' ').length;
        }, 0) ?? 0;
      return acc + titleWords + descriptionWords;
    }
    return acc;
  }, 0);

  return Math.ceil(totalWords / DEFAULT_WORDS_PER_MINUTE);
};
