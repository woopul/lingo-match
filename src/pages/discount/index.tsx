import { getLayoutConfig } from '@lingo-match/api/strapi';
import { PrettyJSON } from '@lingo-match/components';
import { DEFAULT_STATIC_PAGE_CACHE_TIME } from '@lingo-match/constants/cache';
import withLayout from '@lingo-match/containers/withLayout';
import { BaseGetStaticPropsType } from '@lingo-match/types/strapi/baseApiResponse';
import { PlatformDTO } from '@lingo-match/types/strapi/blocks';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps<BaseGetStaticPropsType> = async (context) => {
  const layoutConfig = await getLayoutConfig();

  return {
    props: {
      discounts: [],
      layoutConfig: layoutConfig || {},
    },
    revalidate: DEFAULT_STATIC_PAGE_CACHE_TIME,
  };
};

type DiscountPageProps = {
  discounts: PlatformDTO[];
};

const DiscountPage = ({ discounts }: DiscountPageProps) => {
  return (
    <main className="min-h-screen">
      <h2 className="text-6xl mt-3 font-bold">Discount Page</h2>
      <h3 className="my-2">discount list :</h3>
      <div className="flex flex-col">
        {discounts.map((post) => (
          <PrettyJSON data={post} key={post.slug} />
        ))}
      </div>
    </main>
  );
};

export default withLayout(DiscountPage);
