import { FilterAccordionDTO } from '@lingo-match/types/strapi/blocks';
import { debounce, isEmpty } from 'lodash-es';
import { useEffect, useState } from 'react';

import { FiltersAsideDesktop } from './FiltersAsideDesktop';
import { FiltersBarMobile } from './FiltersBarMobile';
import { FilterSliderMobile } from './FilterSliderMobile';

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
  const [isMobileFilterModalOpen, setIsMobileFilterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    setInitialised(true);
  }, []);

  useEffect(() => {
    debounceFetchFilters();
    return () => {
      debounceFetchFilters.cancel();
    };
  }, [selectedFilters]);

  const handleFiltersChange = (filter: SelectedFilterType) => {
    if (!isEmpty(selectedFilters) && selectedFilters.some((item) => item.name === filter.name)) {
      setSelectedFilters(selectedFilters.filter((item) => item.name !== filter.name));
      return;
    }
    setSelectedFilters([...selectedFilters, filter]);
  };

  const handleFiltersSubmit = async () => {
    if (!initialised) {
      return;
    }

    setIsLoading(true);
    const filtersArray = selectedFilters.map((item) => item.type);

    // TODO - handle response change for filtered platforms
    const response = await fetch('/api/platforms/filter', {
      body: JSON.stringify(filtersArray),
      method: 'POST',
    });

    const { data, success } = await response.json();

    if (!success) {
      // TODO - handle fetch error (notification?)
      setIsLoading(false);
      return;
    }
    setPlatformList(data);
    setIsLoading(false);
  };

  const debounceFetchFilters = debounce(handleFiltersSubmit, 1000);

  return (
    <>
      {/* Mobile Filters  */}
      <FiltersBarMobile
        className="z-10 col-span-12 -ml-2 mb-2 w-[100vw] bg-transparent desktop:hidden"
        filterButtonLabelMobile={labels.filters}
        handleFiltersChange={handleFiltersChange}
        handleMobileFiltersOpen={() => setIsMobileFilterModalOpen(!isMobileFilterModalOpen)}
        isLoading={isLoading}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <FilterSliderMobile
        close={() => setIsMobileFilterModalOpen(false)}
        filters={filters}
        isMobileFiltersOpen={isMobileFilterModalOpen}
        selectedFilters={selectedFilters}
        setPlatformList={setPlatformList}
        setSelectedFilters={setSelectedFilters}
      />
      {/* Desktop Filters  */}
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
