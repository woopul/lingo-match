import 'swiper/css';
import 'swiper/css/navigation';

import Button from '@lingo-match/components/Atoms/Button';
import { cn } from '@lingo-match/utlis/cn';
import { useEffect, useRef, useState } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import { IoCloseOutline } from 'react-icons/io5';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './FiltersBarMobile.module.css';

type SelectedFilterType = {
  groupId: number;
  name: string;
  type: string;
};

export type FitlersBarMobileProps = {
  className?: string;
  cleanFiltersButtonLabel?: string;
  filterButtonLabelMobile: string;
  handleFiltersChange: (filter: SelectedFilterType) => void;
  handleMobileFiltersOpen: () => void;
  isLoading: boolean;
  selectedFilters?: Array<SelectedFilterType>;
  setSelectedFilters: (filters: any) => void;
  totalItems?: number;
};

const labels = {
  allPlatformsFound: 'Znalezione oferty',
};

export const FiltersBarMobile = ({
  className,
  cleanFiltersButtonLabel = 'Wyczyść',
  filterButtonLabelMobile,
  handleFiltersChange,
  handleMobileFiltersOpen,
  isLoading,
  selectedFilters,
  setSelectedFilters,
  totalItems,
}: FitlersBarMobileProps) => {
  const [_, setInit] = useState(false);
  const [isFilterStickyActive, setIsFilterStickyActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headerHeight = document.getElementById('header')?.offsetHeight;
    const handleScroll = () => {
      if (ref.current && headerHeight) {
        const { top } = ref.current.getBoundingClientRect();
        setIsFilterStickyActive(top <= headerHeight);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'w-100vw sticky top-[67px] h-fit px-2 py-2 transition-all duration-200',
        styles.PlatformFiltersBarMobile,
        isFilterStickyActive && 'border-b-[1px] border-b-gray-300 bg-white shadow-md',
        className,
      )}
      ref={ref}
    >
      <div className="relative flex items-center">
        <button className="flex items-center gap-1 text-16" onClick={handleMobileFiltersOpen}>
          <div className="relative">
            <BsFilterLeft className="z-2" size={26} />
            {(!!selectedFilters?.length || isLoading) && (
              <span
                className={cn(
                  'absolute -right-[6px] -top-[4px] h-[15px] w-[15px] rounded-full bg-orange text-10 ',
                  {
                    ['animate-spin border-2 border-[#ffffff60] border-r-[#ffe70f] bg-transparent']:
                      isLoading,
                  },
                )}
              >
                {!isLoading && selectedFilters!.length}
              </span>
            )}
          </div>
          <div>{filterButtonLabelMobile}</div>
        </button>
        <div className="relative -mr-2 ml-1.5 w-full overflow-hidden">
          <Swiper
            modules={[Navigation]}
            onInit={() => setInit(true)}
            slidesPerView="auto"
            spaceBetween={8}
          >
            <SwiperSlide>
              {!!selectedFilters?.length && (
                <button
                  className="rounded-full border-[1px] border-black px-1 text-14"
                  onClick={() => setSelectedFilters([])}
                >
                  {cleanFiltersButtonLabel}
                </button>
              )}
            </SwiperSlide>
            {selectedFilters?.map((filter) => (
              <SwiperSlide key={filter.name}>
                <div className="flex w-fit flex-row-reverse content-between items-center rounded-full bg-orange">
                  <Button
                    className="peer p-[0.5rem] px-[0.5rem]"
                    onClick={() => handleFiltersChange(filter)}
                    type={'button'}
                    variant="text"
                  >
                    <IoCloseOutline />
                  </Button>
                  <span className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap pl-1 leading-14 peer-hover:line-through">
                    {filter.name}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="mt-1">
        <div className="text-12 text-darkGrey">
          {labels.allPlatformsFound}: {totalItems}
        </div>
      </div>
    </div>
  );
};
