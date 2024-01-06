import { PlatformCardDesktop, PlatformCardProps } from './components/PlatformCardDesktop';
import { PlatformCardMobile } from './components/PlatformCardMobile';

export const PlatformCard = (props: PlatformCardProps) => {
  return (
    <>
      <PlatformCardDesktop className="hidden first-of-type:-mt-1 lg:block" {...props} />
      <PlatformCardMobile className="lg:hidden" {...props} />
    </>
  );
};
