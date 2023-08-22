import Button from '@lingo-match/components/Atoms/Button';
import Checkbox from '@lingo-match/components/Atoms/Checkbox';
import IconImage from '@lingo-match/components/Atoms/IconImage';
import Loader from '@lingo-match/components/Atoms/Loader';
import AccordionItem from '@lingo-match/components/Organisms/AccordionItem';
import { FilterAccordionDTO } from '@lingo-match/types/strapi/blocks';
import clsx from 'clsx';
import { debounce, isEmpty } from 'lodash-es';
import { useEffect, useState } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import { IoCloseOutline } from 'react-icons/io5';

import { MainFiltersMobile } from './MainFiltersMobile';
import { MainPlatformFilters } from './MainPlatformFilters';
import { PlatformFitlersBarMobile } from './PlatformFiltersBarMobile';

export type MainPlatformFiltersProps = {
  filters: FilterAccordionDTO[] | [];
  setPlatformList: (platforms: any) => void;
};

const labels = {
  cleanFilters: 'Wyczyść filtry',
  filters: 'Filtry',
  selectedFilters: 'Wybrane filtry',
};

type SelectedFilterType = {
  groupId: number;
  name: string;
  type: string;
};

export const PlatformFilters = ({ filters, setPlatformList }: MainPlatformFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<Array<SelectedFilterType>>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <>
      <PlatformFitlersBarMobile
        className="z-10 col-span-12 -ml-2 mb-2 w-[100vw] bg-transparent"
        filterButtonLabelMobile={labels.filters}
        handleMobileFiltersOpen={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        selectedFilters={selectedFilters}
      />
      <MainFiltersMobile
        close={() => setIsMobileFiltersOpen(false)}
        filters={filters}
        isMobileFiltersOpen={isMobileFiltersOpen}
        selectedFilters={selectedFilters}
        setPlatformList={setPlatformList}
        setSelectedFilters={setSelectedFilters}
      />
      {/* <MainPlatformFilters
        filters={filters}
        isMobileFiltersOpen={isMobileFiltersOpen}
        selectedFilters={selectedFilters}
        setPlatformList={setPlatformList}
        setSelectedFilters={setSelectedFilters}
      /> */}
    </>
  );
};
