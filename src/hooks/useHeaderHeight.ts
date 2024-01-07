import { useEffect, useState } from 'react';

export const useHeaderHeight = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
    setHeaderHeight(headerHeight);
  }, []);

  return headerHeight;
};
