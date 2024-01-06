import { createContext, useContext } from 'react';

export type LabelsContextType = Record<string, string | Record<string, string>>;

export const LabelsContext = createContext<LabelsContextType>({});
