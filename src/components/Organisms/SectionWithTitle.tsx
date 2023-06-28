import RichText from '@lingo-match/components/Atoms/RichText';
import { DescriptionDTO, TitleDTO } from '@lingo-match/types/strapi/blocks';

export type SectionWithTitleProps = {
  description: DescriptionDTO[];
  title: TitleDTO;
};

const SectionWithTitle = ({ description, title }: SectionWithTitleProps) => {
  const CustomTag = title?.tagType || 'h2';
  return (
    <section className="[&_*+*]:mt-1 [&>h1]:mb-2">
      {title && <CustomTag className={title.titleSizeStyle}>{title.title}</CustomTag>}
      {description?.map(({ descriptionSizeStyle, descriptionText, id, textColor }) => (
        <RichText data={descriptionText} key={id} style={{ color: textColor }} />
      ))}
    </section>
  );
};

export default SectionWithTitle;
