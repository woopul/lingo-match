import 'swiper/css';
import 'swiper/css/navigation';

import Button from '@lingo-match/components/Atoms/Button';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './PlatformFiltersBarMobile.module.css';

type SelectedFilterType = {
  groupId: number;
  name: string;
  type: string;
};

export type PlatformFitlersBarMobileProps = {
  className?: string;
  cleanFiltersButtonLabel?: string;
  filterButtonLabelMobile: string;
  handleMobileFiltersOpen: () => void;
  selectedFilters?: Array<SelectedFilterType>;
};

export const PlatformFitlersBarMobile = ({
  className,
  cleanFiltersButtonLabel = 'Wyczyść',
  filterButtonLabelMobile,
  handleMobileFiltersOpen,
  selectedFilters,
}: PlatformFitlersBarMobileProps) => {
  const [_, setInit] = useState(false);
  const swiperRef = useRef(null);

  const prevButton = useRef(null);
  const nextButton = useRef(null);

  return (
    <div
      className={clsx(
        'w-100vw h-fit bg-lighterGrey px-2',
        styles.PlatformFiltersBarMobile,
        className,
      )}
    >
      <div className="relative flex items-center">
        <button className="flex items-center gap-1 text-16" onClick={handleMobileFiltersOpen}>
          <div className="relative">
            <BsFilterLeft className="z-2" size={26} />
            {!!selectedFilters?.length && (
              <span className="-z-1 absolute -right-[6px] -top-[4px] z-0 h-[15px] w-[15px] rounded-full bg-orange text-10">
                {selectedFilters.length}
              </span>
            )}
          </div>
          <div>{filterButtonLabelMobile}</div>
        </button>
        <div className="relative ml-1.5 w-full overflow-hidden">
          <button
            className="bg-opacity-4 absolute left-0 top-0 z-30 h-full bg-gradient-to-r from-white via-white via-80% pl-1 pr-1 opacity-90"
            ref={prevButton}
          >
            <MdOutlineArrowForwardIos className="-ml-1 rotate-180" size={16} />
          </button>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: nextButton.current,
              prevEl: prevButton.current,
            }}
            onInit={() => setInit(true)}
            slidesPerView="auto"
            spaceBetween={8}
          >
            <SwiperSlide>
              {!!selectedFilters?.length && (
                <button className="rounded-full border-[1px] border-black px-1 text-14">
                  Wyczyść
                </button>
              )}
            </SwiperSlide>
            {selectedFilters?.map((filter) => (
              <SwiperSlide key={filter.name}>
                <div className="flex w-fit flex-row-reverse content-between items-center rounded-full bg-orange">
                  <Button
                    className="peer p-[0.5rem] px-[0.5rem]"
                    // onClick={() => handleFiltersChange(filter)}
                    type={'button'}
                    variant="text"
                  >
                    <IoCloseOutline />
                  </Button>
                  <span className="pl-1 leading-14 peer-hover:line-through">{filter.name}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <button
          className="bg-opacity-4 absolute right-0 top-[2px] z-30 -mr-2 h-[22px] bg-gradient-to-l from-white via-white via-80% pl-1 pr-1 opacity-90"
          ref={nextButton}
        >
          <MdOutlineArrowForwardIos size={16} />
        </button>
      </div>
    </div>
  );
};
