import { cn } from '@lingo-match/utlis/cn';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type RichTextProps = {
  className?: string;
  data: string;
  style?: React.CSSProperties;
};

const RichText = ({ className, data, style }: RichTextProps) => (
  <section className={cn('rich-text py-1', className)} style={style}>
    <Markdown remarkPlugins={[remarkGfm]}>{data}</Markdown>
  </section>
);

export default RichText;
