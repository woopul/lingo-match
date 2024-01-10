import { debounce } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';

type SelectedFilterType = {
  groupId: number;
  name: string;
  type: string;
};
// type HookOptionType = {};

export const usePlatformFetch = (filters: Array<SelectedFilterType>, pageSize?: number) => {
  const [initialized, setInitialized] = useState(false);

  // const debounceFetchFilters = debounce(handleFiltersSubmit, 1000);

  // useEffect(() => {
  //   debounceFetchFilters();
  //   return () => {
  //     debounceFetchFilters.cancel();
  //   };
  // }, [selectedFilters]);
  // return {};
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedFetchData = useCallback(
    debounce(async (filtersArray, pageSize) => {
      try {
        setLoading(true);
        // Your fetch logic here with searchQuery
        const response = await fetch(`/api/platforms/filter?pageSize=${pageSize}`, {
          body: JSON.stringify(filtersArray),
          method: 'POST',
        });

        const { data, success } = await response.json();
        if (!success) {
          console.error('Error while fetching filtered platforms');
          setLoading(false);
          return;
        }

        setData(data);
      } catch (error) {
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    }, 500),
    [],
  );

  useEffect(() => {
    if (initialized) {
      console.log('usePlatform fetch', { filters, pageSize });
    }
    setInitialized(true);
    // if()
    // debouncedFetchData(filters);
  }, [filters, pageSize, debouncedFetchData]);

  // Rest of your component code...
};
