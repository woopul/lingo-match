import { PlatformCardDesktop, PlatformCardProps } from './PlatformCardDesktop';
import { PlatformCardMobile } from './PlatformCardMobile';

export const PlatformCard = (props: PlatformCardProps) => (
  <>
    <PlatformCardMobile {...props} />
    <PlatformCardDesktop {...props} />
  </>
);
