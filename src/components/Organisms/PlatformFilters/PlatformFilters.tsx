import { FilterAccordionDTO } from '@lingo-match/types/strapi/blocks';
import { strapiData } from '@lingo-match/utlis';
import { debounce, isEmpty } from 'lodash-es';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

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
  const [isLoading, setIsLoading] = useState(false);
  const [initialised, setInitialised] = useState(false);
  const timeoutId = useRef<any>(null);
  const toastId = useRef<any>(null);
  usePlatformFetch(selectedFilters, pageSize);

  useEffect(() => {
    setInitialised(true);
  }, []);

  useEffect(() => {
    debounceFetchFilters();
    return () => {
      debounceFetchFilters.cancel();
    };
  }, [selectedFilters]);

  useEffect(() => {}, [isLoading, isMobileFilterModalOpen]);

  const handleFiltersChange = (filter: SelectedFilterType) => {
    if (!isEmpty(selectedFilters) && selectedFilters.some((item) => item.name === filter.name)) {
      setSelectedFilters(selectedFilters.filter((item) => item.name !== filter.name));
      return;
    }
    setSelectedFilters([...selectedFilters, filter]);
  };

  const handleCloseMobileFilters = () => {
    setIsMobileFilterModalOpen(false);
  };

  const handleFiltersSubmit = async () => {
    if (!initialised) {
      return;
    }
    // remove pending toast and closing filters board if exists
    if (timeoutId.current || toastId.current) {
      clearTimeout(timeoutId.current);
      toast.dismiss(toastId.current);
    }

    setIsLoading(true);
    const filtersArray = selectedFilters.map((item) => item.type);

    // TODO - handle response change for filtered platforms
    const response = await fetch(`/api/platforms/filter?pageSize=${pageSize}`, {
      body: JSON.stringify(filtersArray),
      method: 'POST',
    });

    const { data, success } = await response.json();

    if (!success) {
      console.error('Error while fetching filtered platforms');
      setIsLoading(false);
      return;
    }
    setPlatformList(strapiData(data));

    setTotal(data.meta.pagination.total);
    setPageCount(data.meta.pagination.pageCount);

    setIsLoading(false);
    if (isMobileFilterModalOpen && !data.data.length) {
      toastId.current = toast.info('Nie znaleziono ofert');
    }

    if (isMobileFilterModalOpen && data.data.length) {
      toastId.current = toast.success(`Znaleziono ${data.meta.pagination.total} ofert`, {
        duration: 2000,
      });
      timeoutId.current = setTimeout(() => setIsMobileFilterModalOpen(false), 2000);
    }
  };

  const debounceFetchFilters = debounce(handleFiltersSubmit, 1000);

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
