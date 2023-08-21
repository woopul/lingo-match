import { PrettyJSON } from '@lingo-match/components/Atoms';
import AccordionItem from '@lingo-match/components/Organisms/AccordionItem';
import { BlockWrapper } from '@lingo-match/types/strapi/blocks';
import React from 'react';

export type BlockRendererProps = {
  blockConfig: Record<string, any>;
  blocks?: BlockWrapper[];
};

const getComponent = (__component: string, blockConfig: Record<string, any>) => {
  const blockName = __component.split('.')[1];
  return blockConfig[blockName];
};

const BlockRenderer = ({ blockConfig, blocks }: BlockRendererProps) => {
  if (!blocks?.length) {
    return null;
  }

  return (
    <div className="w-full [&>*+*]:mt-3">
      {blocks.map(({ __component, id, ...rest }) => {
        const Component = getComponent(__component, blockConfig);

        if (!Component) {
          return <Placeholder component={__component} {...rest} key={id} />;
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
