import clsx from 'clsx';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type RichTextProps = {
  className?: string;
  data: string;
  style?: React.CSSProperties;
};

const RichText = ({ className, data, style }: RichTextProps) => (
  <section className={clsx('rich-text py-1', className)} style={style}>
    <Markdown remarkPlugins={[remarkGfm]}>{data}</Markdown>
  </section>
);

export default RichText;
