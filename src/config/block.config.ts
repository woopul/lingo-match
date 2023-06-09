import dynamic from 'next/dynamic';

const LinkIcon = dynamic(() => import('@lingo-match/components/Atoms/LinkIcon'), {
  ssr: true,
});

const Hero = dynamic(() => import('@lingo-match/components/Atoms/Hero'), {
  ssr: true,
});

const ImagesContainer = dynamic(() => import('@lingo-match/components/Atoms/ImagesContainer'), {
  ssr: true,
});

const Spacer = dynamic(() => import('@lingo-match/components/Atoms/Spacer'), {
  ssr: true,
});

const CheckboxColumns = dynamic(() => import('@lingo-match/components/Organisms/CheckboxColumns'), {
  ssr: true,
});

const SectionWithTitle = dynamic(
  () => import('@lingo-match/components/Organisms/SectionWithTitle'),
  {
    ssr: true,
  },
);

export type BlockConfigType = Record<string, any>;

export const blockConfig = {
  'checkbox-columns': CheckboxColumns,
  hero: Hero,
  'icon-link': LinkIcon,
  'images-container': ImagesContainer,
  'section-with-title': SectionWithTitle,
  spacing: Spacer,
};

export default blockConfig;
