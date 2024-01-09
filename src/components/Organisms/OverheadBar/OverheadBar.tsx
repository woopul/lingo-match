import RichText from '@lingo-match/components/Atoms/RichText';
import { cn } from '@lingo-match/utlis/cn';
import Markdown from 'react-markdown';

export type OverheadBarProps = {
  bgColor?: string;
  richText: string;
};

export const OverheadBar = ({ bgColor, richText }: OverheadBarProps) => {
  return (
    <div className="h-5 bg-black" style={{ background: bgColor }}>
      <Markdown className="text-white">{richText}</Markdown>
    </div>
  );
};
