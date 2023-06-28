import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type RichTextProps = {
  data: string;
};

const RichText = ({ data }: RichTextProps) => (
  <section className="rich-text py-2">
    <Markdown className="prose lg:prose-xl" remarkPlugins={[remarkGfm]}>
      {data}
    </Markdown>
  </section>
);

export default RichText;
