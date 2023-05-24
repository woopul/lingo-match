import { DescriptionDTO, TitleDTO } from '@lingo-match/types/strapi/blocks';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';

export type SectionWithTitleProps = {
  description: DescriptionDTO[];
  title: TitleDTO;
};

const descriptionTextSizeClassNameMap = {
  L: 'text-paragraph',
  M: 'text-small',
  S: 'text-xsmall',
  XL: 'text-preamble',
};

const SectionWithTitle = ({ description, title }: SectionWithTitleProps) => {
  const CustomTag = title?.tagType || 'h2';
  return (
    <section className="[&_*+*]:mt-1 [&>h1]:mb-2">
      {title && <CustomTag className={title.titleSizeStyle}>{title.title}</CustomTag>}
      {description?.map(
        ({ description, descriptionRichText, descriptionSizeStyle, id, textColor }) => {
          if (descriptionRichText) {
            return (
              <ReactMarkdown
                className={descriptionTextSizeClassNameMap[descriptionSizeStyle]}
                key={id}
              >
                {descriptionRichText}
              </ReactMarkdown>
            );
          }
          return (
            <p
              className={clsx(
                descriptionSizeStyle && descriptionTextSizeClassNameMap[descriptionSizeStyle],
              )}
              key={id}
              style={textColor ? { color: textColor } : {}}
            >
              {description}
            </p>
          );
        },
      )}
    </section>
  );
};

export default SectionWithTitle;
