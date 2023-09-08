import { PlatformCardDesktop, PlatformCardProps } from './PlatformCardDesktop';
import { PlatformCardMobile } from './PlatformCardMobile';

export const PlatformCard = (props: PlatformCardProps) => {
  console.log('PLATFORM CARD', props);
  return (
    <div>
      COŚ
      <PlatformCardMobile className="desktop:hidden" {...props} />
      <PlatformCardDesktop className="hidden desktop:block " {...props} />
    </div>
  );
};
