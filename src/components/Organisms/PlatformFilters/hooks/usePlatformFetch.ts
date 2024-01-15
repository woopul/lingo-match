import { PlatformDTO } from '@lingo-match/types/strapi';
import { debounce } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

type SelectedFilterType = {
  groupId: number;
  name: string;
  type: string;
};

export const usePlatformFetch = (filters: Array<SelectedFilterType>, pageSize?: number) => {
  const [initialized, setInitialized] = useState(false);
  const [data, setData] = useState<{
    pageCount: number;
    platforms: PlatformDTO[];
    success: boolean;
    total: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const debouncedFetchDataRef = useRef(
    debounce(async (filters: Array<SelectedFilterType>, pageSize) => {
      console.log('test debouncedFetchDataRef');
      try {
        setIsLoading(true);

        // Create a new AbortController for this fetch request
        const newAbortController = new AbortController();
        abortControllerRef.current = newAbortController;

        const filtersArray = filters.map((item) => item.type);

        // Use the AbortController signal in the fetch request
        const response = await fetch(`/api/platforms/filter?pageSize=${pageSize}`, {
          body: JSON.stringify(filtersArray),
          method: 'POST',
          signal: newAbortController.signal,
        });

        const { data, success } = await response.json();

        if (!success) {
          console.log('Error while fetching filtered platforms', { data, success });
          setIsLoading(false);
        }

        setData(data);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Fetch error:', error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }, 500),
  );

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      return;
    }

    debouncedFetchDataRef.current(filters, pageSize);
    return () => {
      // Cleanup function to abort the fetch when component unmounts or filters/pageSize changes
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [filters, pageSize]);

  return { data, isLoading };
};
