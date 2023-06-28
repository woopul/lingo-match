import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import BlockQuote from './BlockQuote';

type RichTextProps = {
  data: string;
};

const RichText = ({ data }: RichTextProps) => (
  <section className="rich-text py-2">
    <Markdown remarkPlugins={[remarkGfm]}>{data}</Markdown>
  </section>
);

export default RichText;
