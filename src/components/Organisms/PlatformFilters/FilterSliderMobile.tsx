import Button from '@lingo-match/components/Atoms/Button';
import Checkbox from '@lingo-match/components/Atoms/Checkbox';
import IconImage from '@lingo-match/components/Atoms/IconImage';
import Loader from '@lingo-match/components/Atoms/Loader';
import AccordionItem from '@lingo-match/components/Organisms/AccordionItem';
import { FilterAccordionDTO } from '@lingo-match/types/strapi/blocks';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import clsx from 'clsx';
import { debounce, isEmpty } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BsFilterLeft } from 'react-icons/bs';
import { IoClose, IoCloseOutline } from 'react-icons/io5';

export type FilterSliderMobileProps = {
  className?: string;
  close: () => void;
  filters: FilterAccordionDTO[] | [];
  isMobileFiltersOpen?: boolean;
  selectedFilters: Array<SelectedFilterType>;
  setPlatformList: (platforms: any) => void;
  setSelectedFilters: (filters: any) => void;
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

export const FilterSliderMobile = ({
  className,
  close,
  filters,
  isMobileFiltersOpen,
  selectedFilters,
  setPlatformList,
  setSelectedFilters,
}: FilterSliderMobileProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialised, setInitialised] = useState(false);
  const filterContainer = useRef(null);

  useEffect(() => {
    setInitialised(true);
  }, []);

  useEffect(() => {
    const filterContainerTarget = filterContainer.current;

    if (isMobileFiltersOpen && filterContainerTarget) {
      const storedRequestAnimationFrame = window.requestAnimationFrame;
      window.requestAnimationFrame = () => 50;
      disableBodyScroll(filterContainerTarget, { reserveScrollBarGap: true });
      window.requestAnimationFrame = storedRequestAnimationFrame;
    }

    return () => clearAllBodyScrollLocks();
  }, [isMobileFiltersOpen]);

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

  const isCheckboxChecked = (type: string) => {
    return selectedFilters.some((item) => item.type === type);
  };

  const getFiltersCountForGroup = (groupId: number) => {
    return selectedFilters.filter((item) => item.groupId === groupId).length;
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

  if (!initialised) {
    return null;
  }

  return createPortal(
    <aside
      className={clsx(
        'fixed inset-0 z-30 -translate-x-full overflow-y-scroll bg-white transition-transform duration-300 ease-in-out desktop:hidden',
        isMobileFiltersOpen && 'translate-x-0',
      )}
      ref={filterContainer}
    >
      <div className="relative px-2">
        <div className="sticky top-0 z-30 -mx-2 mb-2 flex flex-col gap-2 border-b border-lighterGrey bg-white p-2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <BsFilterLeft className="h-[2.4rem] w-[2.4rem]" />
              <div className="mx-2">{labels.filters}</div>
              {isLoading && <Loader className="h-[1.8rem] w-[1.8rem]" />}
            </div>
            <button onClick={close}>
              <IoClose className={clsx('fill:white -mr-[3px]')} size={35} />
            </button>
          </div>

          {!isEmpty(selectedFilters) && (
            <div className="text-paragraph flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="font-bold">{labels.selectedFilters}</div>
                <Button
                  className="pyu-1 border-[1px] border-black px-1 py-[2px]"
                  disabled={isEmpty(selectedFilters)}
                  onClick={() => setSelectedFilters([])}
                  variant="text"
                >
                  {labels.cleanFilters}
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedFilters?.map((filter) => (
                  <div
                    className="flex flex-row-reverse content-between items-center rounded-full bg-orange"
                    key={filter.name}
                  >
                    <Button
                      className="peer p-[0.5rem] px-[0.5rem]"
                      onClick={() => handleFiltersChange(filter)}
                      type={'button'}
                      variant="text"
                    >
                      <IoCloseOutline />
                    </Button>
                    <span className="pl-1 leading-14 peer-hover:line-through">{filter.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <form className="flex flex-col">
          <div className="flex h-full flex-col gap-1.5 pb-2">
            {filters.map(
              ({
                expanded,
                icon,
                id: groupId,
                positionReversed,
                shouldBeExpandable,
                tags,
                title: groupTitle,
                variant,
              }) => {
                const Icon = icon.data ? (
                  <IconImage className="mr-1" src={icon.data.attributes.url} />
                ) : null;

                return (
                  <AccordionItem
                    bold
                    className="px-0 py-0"
                    expanded={expanded}
                    icon={Icon}
                    key={groupId}
                    shouldBeExpandable={shouldBeExpandable}
                    title={`${groupTitle} (${getFiltersCountForGroup(groupId)})`}
                  >
                    <div
                      className={clsx(
                        'flex gap-1 px-1 pb-1',
                        variant === 'label' ? 'flex-row flex-wrap' : 'flex-col',
                      )}
                    >
                      {tags.data?.map(({ attributes, id }) => (
                        <Checkbox
                          checked={isCheckboxChecked(attributes.type)}
                          id={`${attributes.name}-${groupId}-${id}`}
                          key={id}
                          label={attributes.name}
                          labelFullWidth
                          onChange={() =>
                            handleFiltersChange({
                              groupId,
                              name: attributes.name,
                              type: attributes.type ?? attributes.name,
                            })
                          }
                          positionReversed={positionReversed}
                          variant={variant}
                        />
                      ))}
                    </div>
                  </AccordionItem>
                );
              },
            )}
          </div>
        </form>
      </div>
    </aside>,
    document.body,
  );
};
