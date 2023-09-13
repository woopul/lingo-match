export const getComponent = (__component: string, blockConfig: Record<string, any>) => {
  const blockName = __component.split('.')[1];
  return blockConfig[blockName];
};
