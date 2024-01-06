import { useContext } from 'react';

import { LabelsContext } from './Context';

export const useLabels = (key?: string) => {
  const labelsDictionary = useContext(LabelsContext);

  return key ? labelsDictionary[key] : labelsDictionary;
};
