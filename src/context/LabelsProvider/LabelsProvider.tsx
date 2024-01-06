import type { ReactNode } from 'react';

import { LabelsContext, LabelsContextType } from './Context';

export type LabelsDictionaryContextType = {
  children: ReactNode;
  labels: LabelsContextType;
};

export const LabelsProvider = ({ children, labels }: LabelsDictionaryContextType) => {
  return <LabelsContext.Provider value={labels}>{children}</LabelsContext.Provider>;
};
