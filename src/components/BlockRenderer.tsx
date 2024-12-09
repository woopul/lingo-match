import { PrettyJSON } from '@lingo-match/components/Atoms';
import AccordionItem from '@lingo-match/components/Organisms/AccordionItem';
import { blockConfig } from '@lingo-match/config/block.config';
import { StrapiBlockType } from '@lingo-match/types/strapi/blocks';
import { getComponent } from '@lingo-match/utlis';
import React from 'react';

export type BlockRendererProps = {
  blocks?: StrapiBlockType[];
};

const BlockRenderer = ({ blocks }: BlockRendererProps) => {
  if (!blocks?.length) {
    return null;
  }

  return (
    <div className="w-full">
      {blocks.map(({ __component, id, ...rest }) => {
        const Component = getComponent(__component, blockConfig);

        if (!Component) {
          return <Placeholder component={__component} {...rest} key={`${id}_${__component}`} />;
        }

        return <Component key={id} {...rest} />;
      })}
    </div>
  );
};

const Placeholder = ({ component, ...rest }: { component: string }) => (
  <div className="placeholder my-1 p-2">
    <AccordionItem
      className="z-10 h-fit w-[25vw] bg-white py-1 text-left [&>button]:mr-3 "
      title={
        <p>
          <span className="font-bold">{component}</span> not found | data:
        </p>
      }
    >
      <PrettyJSON data={rest} />
    </AccordionItem>
  </div>
);

export default BlockRenderer;
