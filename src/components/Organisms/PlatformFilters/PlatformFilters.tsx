import { FilterAccordionDTO } from '@lingo-match/types/strapi/blocks';
import { isEmpty } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

import { FiltersAsideDesktop } from './components/Desktop/FiltersAsideDesktop';
import { FiltersBarMobile } from './components/Mobile/FiltersBarMobile';
import { FilterSliderMobile } from './components/Mobile/FilterSliderMobile';
import { usePlatformFetch } from './hooks/usePlatformFetch';

export type MainPlatformFiltersProps = {
  filters: FilterAccordionDTO[] | [];
  pageSize?: number;
  setPageCount: (count: number) => void;
  setPlatformList: (platforms: any) => void;
  setTotal: (count: any) => void;
  totalItems?: number;
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

export const PlatformFilters = ({
  filters,
  pageSize,
  setPageCount,
  setPlatformList,
  setTotal,
  totalItems,
}: MainPlatformFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<Array<SelectedFilterType>>([]);
  const [isMobileFilterModalOpen, setIsMobileFilterModalOpen] = useState(false);
  const [initialised, setInitialised] = useState(false);
  const timeoutId = useRef<any>(null);
  const toastId = useRef<any>(null);
  const { data, isLoading } = usePlatformFetch(selectedFilters, pageSize);

  useEffect(() => {
    if (data) {
      setPlatformList(data.platforms);
      setTotal(data.total);
      setPageCount(data.pageCount);
    }
  }, [data]);

  const handleFiltersChange = (filter: SelectedFilterType) => {
    if (!isEmpty(selectedFilters) && selectedFilters.some((item) => item.name === filter.name)) {
      setSelectedFilters(selectedFilters.filter((item) => item.name !== filter.name));
      return;
    }
    setSelectedFilters([...selectedFilters, filter]);
  };

  return (
    <>
      <FiltersBarMobile
        className="z-20 col-span-12 -ml-2 mb-2 w-[100vw] desktop:hidden"
        filterButtonLabelMobile={labels.filters}
        handleFiltersChange={handleFiltersChange}
        handleMobileFiltersOpen={() => setIsMobileFilterModalOpen(!isMobileFilterModalOpen)}
        isLoading={isLoading}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        totalItems={totalItems}
      />
      <FilterSliderMobile
        className="desktop:hidden"
        close={() => setIsMobileFilterModalOpen(false)}
        filters={filters}
        handleFiltersChange={handleFiltersChange}
        isLoading={isLoading}
        isMobileFiltersOpen={isMobileFilterModalOpen}
        selectedFilters={selectedFilters}
        setPlatformList={setPlatformList}
        setSelectedFilters={setSelectedFilters}
      />

      <FiltersAsideDesktop
        filters={filters}
        handleFiltersChange={handleFiltersChange}
        isLoading={isLoading}
        selectedFilters={selectedFilters}
        setPlatformList={setPlatformList}
        setSelectedFilters={setSelectedFilters}
      />
    </>
  );
};
