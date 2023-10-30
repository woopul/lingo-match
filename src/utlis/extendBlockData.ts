import { StrapiBlockType } from '@lingo-match/types/strapi';

type ExtendBlockDataParams = {
  blocks: StrapiBlockType[];
  getPropsConfig: { [key: string]: (block: StrapiBlockType<any>) => Promise<StrapiBlockType<any>> };
};

export const extendBlockData = async ({ blocks, getPropsConfig }: ExtendBlockDataParams) => {
  if (!blocks?.length) {
    return;
  }
  blocks.map((block) => block.__component);

  return Promise.all(
    blocks?.map((block) => {
      const targetBlock = block.__component.split('.')[1];
      const getProps = getPropsConfig[targetBlock] || (() => Promise.resolve(block));
      return getProps(block);
    }),
  );
};
