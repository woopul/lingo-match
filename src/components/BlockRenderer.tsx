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
    <>
      {blocks.map(({ __component, id, ...rest }) => {
        const Component = getComponent(__component, blockConfig);

        if (!Component) {
          return <Placeholder component={__component} key={id} />;
        }

        return <Component key={id} {...rest} />;
      })}
    </>
  );
};

const Placeholder = ({ component }: { component: string }) => (
  <div className="placeholder my-1">
    <p className="bg-white h-fit z-10">
      Block <b>{component}</b> not found.
    </p>
  </div>
);

export default BlockRenderer;
