import { getHomePage, getLayoutConfig, getPlatforms } from '@lingo-match/api/strapi';
import { GradientBox } from '@lingo-match/components';
import Checkbox from '@lingo-match/components/Atoms/CheckBox';
import Hero from '@lingo-match/components/Atoms/Hero';
import { PlatformCard } from '@lingo-match/components/Organisms';
import AccordionItem from '@lingo-match/components/Organisms/AccordionItem';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import withLayout from '@lingo-match/containers/withLayout';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';
import { HomePageDTO, PlatformDTO } from '@lingo-match/types/strapi/blocks';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps<BaseGetStaticPropsType> = async (context) => {
  const [layoutConfig, platforms, homePage] = await Promise.all([
    getLayoutConfig(),
    getPlatforms(),
    getHomePage(),
  ]);

  const blocks = (homePage as HomePageDTO)?.blocks || [];
  return {
    props: {
      blocks: blocks,
      homePage: homePage || {},
      layoutConfig: layoutConfig || {},
      platforms: platforms || [],
    },
    revalidate: DEFAULT_STATIC_PAGE_CACHE_TIME,
  };
};

type HomePageProps = {
  homePage: HomePageDTO;
  platforms: PlatformDTO[];
};

const HomePage = ({ homePage: { hero, platformCard }, platforms }: HomePageProps) => {
  return (
    <>
      <GradientBox />
      {hero && <Hero {...hero} />}
      <div className="grid grid-cols-12 gap-x-2 h-full min-h-[150vh] mt-3">
        <aside className="bg-white col-span-3 rounded-md sticky top-[calc(8.5rem+1.6rem)] h-[50rem] drop-shadow-md">
          <AccordionItem expanded title="Accordion Item 1">
            <div>
              <Checkbox id={'1'} label="text checkbox" variant="icon" />
            </div>
          </AccordionItem>
        </aside>
        <div className="flex flex-col gap-y-2 col-span-9">
          {platforms.map((platform) => (
            <PlatformCard {...platform} {...platformCard} key={platform.slug} />
          ))}
        </div>
      </div>
    </>
  );
};

export default withLayout(HomePage);
