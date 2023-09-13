import { PlatformCardDesktop, PlatformCardProps } from './PlatformCardDesktop';
import { PlatformCardMobile } from './PlatformCardMobile';

export const PlatformCard = (props: PlatformCardProps) => {
  return (
    <>
      <PlatformCardMobile className="desktop:hidden" {...props} />
      <PlatformCardDesktop className="hidden desktop:block " {...props} />
    </>
  );
};
