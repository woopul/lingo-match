import { cn } from '@lingo-match/utlis/cn';

type MaxWidthWrapperProps = {
  children: React.ReactNode;
  className?: string;
  type?: ContentTypeWidth;
};

type ContentTypeWidth = 'read';

const contentTypeWidth: Record<ContentTypeWidth, string> = {
  read: 'max-w-[768px] px-0 md:px-0',
};

export const MaxWidthWrapper = ({ children, className, type }: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        'mx-auto h-full w-full max-w-screen-xl px-2.5 md:px-20',
        type ? contentTypeWidth[type] : '',
        className,
      )}
    >
      {children}
    </div>
  );
};
