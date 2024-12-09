import RichText from '@lingo-match/components/Atoms/RichText';
import { DescriptionDTO, TitleDTO } from '@lingo-match/types/strapi/blocks';

export type SectionWithTitleProps = {
  description: DescriptionDTO[];
  title: TitleDTO;
};

export const SectionWithTitle = ({ description, title }: SectionWithTitleProps) => {
  const CustomTag = title?.tagType || 'h2';
  return (
    <section className="mx-auto max-w-[768px]">
      {title && <CustomTag className={title.titleSizeStyle}>{title.title}</CustomTag>}
      {description?.map(({ descriptionSizeStyle, descriptionText, id, textColor }) => (
        <RichText data={descriptionText} key={id} style={{ color: textColor }} />
      ))}
    </section>
  );
};
