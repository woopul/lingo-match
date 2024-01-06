import LinkButton from '@lingo-match/components/Atoms/LinkButton';
import { cn } from '@lingo-match/utlis/cn';

export type CTAButtonProps = {
  className?: string;
  linkCTA?: string;
  navigateToCTAButtonLabel?: string;
};

export const CTAButton = ({ className, linkCTA, navigateToCTAButtonLabel }: CTAButtonProps) => {
  return (
    <div
      className={cn(
        'flex h-[90px] w-full items-center justify-center bg-orange',
        'flex',
        className,
      )}
    >
      <LinkButton className="h-[40px] w-[70%]" href={linkCTA}>
        {navigateToCTAButtonLabel}
      </LinkButton>
    </div>
  );
};
