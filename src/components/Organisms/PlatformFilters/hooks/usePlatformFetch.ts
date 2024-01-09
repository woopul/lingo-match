// import { useEffect, useState } from 'react';

// export const usePlatformFetch = () => {
//   const [initialized, setInitialized] = useState(false);

//   const debounceFetchFilters = debounce(handleFiltersSubmit, 1000);

//   useEffect(() => {
//     debounceFetchFilters();
//     return () => {
//       debounceFetchFilters.cancel();
//     };
//   }, [selectedFilters]);
//   return {};
// };
